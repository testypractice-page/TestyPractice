<?php
// sendpulse-feedback.php
header('Content-Type: application/json');

// ---------- CONFIG (use getenv in production) ----------
$clientId = getenv('SENDPULSE_CLIENT_ID') ?: 'YOUR_CLIENT_ID';
$clientSecret = getenv('SENDPULSE_CLIENT_SECRET') ?: 'YOUR_CLIENT_SECRET';
$toEmail = getenv('MY_FEEDBACK_EMAIL') ?: 'youremail@gmail.com';

// ---------- read JSON POST ----------
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid JSON payload']);
  exit;
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if (!$name || !$email || !$subject || !$message) {
  http_response_code(400);
  echo json_encode(['error' => 'Missing fields']);
  exit;
}

// ---------- 1) Obtain access token ----------
$tokenUrl = 'https://api.sendpulse.com/oauth/access_token';
$tokenPayload = json_encode([
  'grant_type' => 'client_credentials',
  'client_id' => $clientId,
  'client_secret' => $clientSecret
]);

$opts = ['http' => [
  'method' => 'POST',
  'header' => "Content-Type: application/json\r\n",
  'content' => $tokenPayload,
  'timeout' => 15
]];
$tokenResp = @file_get_contents($tokenUrl, false, stream_context_create($opts));
if ($tokenResp === false) {
  http_response_code(502);
  error_log("SendPulse token request failed");
  echo json_encode(['error' => 'Failed to request access token']);
  exit;
}
$tokenJson = json_decode($tokenResp, true);
$accessToken = $tokenJson['access_token'] ?? null;
if (!$accessToken) {
  http_response_code(502);
  error_log("SendPulse token not returned: " . $tokenResp);
  echo json_encode(['error' => 'Access token missing']);
  exit;
}

// ---------- 2) Prepare email payload (reply_to set to user email) ----------
$html = "<h3>New feedback from " . htmlspecialchars($name) . "</h3>"
      . "<p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>"
      . "<p><strong>From:</strong> " . htmlspecialchars($name) . " &lt;" . htmlspecialchars($email) . "&gt;</p>"
      . "<p><strong>Message:</strong><br/>" . nl2br(htmlspecialchars($message)) . "</p>";

$payload = [
  'email' => [
    'html' => $html,
    'text' => "Feedback from {$name}\nSubject: {$subject}\nFrom: {$email}\n\n{$message}",
    'subject' => "Feedback: {$subject}",
    // for deliverability keep 'from' as a verified email (use your verified address)
    'from' => ['name' => 'KUIZ Feedback', 'email' => $toEmail],
    'to' => [['email' => $toEmail]],
    'reply_to' => ['name' => $name, 'email' => $email]
  ]
];

// ---------- 3) POST to SendPulse SMTP API ----------
$opts2 = ['http' => [
  'method' => 'POST',
  'header' => "Content-Type: application/json\r\nAuthorization: Bearer {$accessToken}\r\n",
  'content' => json_encode($payload),
  'timeout' => 15
]];
$sendResp = @file_get_contents('https://api.sendpulse.com/smtp/emails', false, stream_context_create($opts2));
if ($sendResp === false) {
  http_response_code(502);
  error_log("SendPulse send failed for to={$toEmail}");
  echo json_encode(['error' => 'Failed to send email']);
  exit;
}

// success
echo json_encode(['ok' => true]);