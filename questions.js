// ===========================================
// FUTURE-ORIENTED QUESTIONS DATA MODEL
// ===========================================
//
// subjects = [
//   {
//     id: "eco",
//     name: "Economics",
//     chapters: [
//       {
//         id: "eco_ch1",
//         name: "Introduction to Economics",
//         questions: [ { text, options[], correctIndex }, ... ]
//       },
//       ...
//     ]
//   },
//   ...
// ]

const subjects = [
  {
    id: "eco",
    name: "Economics",
    chapters: [
      {
  id: "eco_ch1",
  name: "Nature and Scope of Business Economics",
  questions: [

    {
      text: "What is Business Economics primarily concerned with?",
      options: [
        "National income and employment",
        "Application of economic theory to business decisions",
        "Political systems and governance",
        "Historical development of money"
      ],
      correctIndex: 1
    },

    {
      text: "Business Economics is mainly derived from which branch of Economics?",
      options: ["Macroeconomics", "International Economics", "Microeconomics", "Public Finance"],
      correctIndex: 2
    },

    {
      text: "Which of the following is NOT a characteristic of Business Economics?",
      options: [
        "It is normative and prescriptive",
        "It is purely theoretical with no practical use",
        "It uses microeconomic concepts",
        "It helps in decision making"
      ],
      correctIndex: 1
    },

    {
      text: "The interference of the government is very limited in—",
      options: ["Socialist economy", "Capitalist economy", "Mixed economy", "All the above"],
      correctIndex: 1
    },

    {
      text: "Normative economics is ______ in nature.",
      options: ["modern", "descriptive", "prescriptive", "none of the above"],
      correctIndex: 2
    },

    {
      text: "As compared to other economic systems, inequalities of incomes is relatively less in:",
      options: ["Capitalist", "Socialist", "Mixed", "None of the above"],
      correctIndex: 1
    },

    {
      text: "“Ends” refer to:",
      options: ["Human Wants", "Resources", "Both (a) and (b)", "Neither (a) nor (b)"],
      correctIndex: 0
    },

    {
      text: "Integration of Economic theory with business practice is called:",
      options: [
        "Managerial Economics",
        "Business Economics",
        "Applied Economics",
        "All of the above"
      ],
      correctIndex: 3
    },

    {
      text: "The Central Problems arise in case of:",
      options: ["Capitalist Economies", "Socialist Economies", "Mixed Economies", "All of the above"],
      correctIndex: 3
    },

    {
      text: "Labour Intensive Technique would get chosen in:",
      options: ["Labour Surplus Economy", "Capital Surplus Economy", "Developed Economy", "Developing Economy"],
      correctIndex: 0
    },

    {
      text: "Which of the following applies to a Capitalist Economy?",
      options: ["Profit Motive", "Government Regulation", "Equal distribution of Incomes", "Absence of Competition among Firms"],
      correctIndex: 0
    },

    {
      text: "In a Mixed Economy, industries in private sector have _____ as their objective.",
      options: ["profit motive only", "community welfare only", "Both (a) and (b)", "Neither (a) nor (b)"],
      correctIndex: 0
    },

    {
      text: "‘Economics is the science of choice making’ implies:",
      options: [
        "No choice is to be made",
        "Choice to be made between alternative uses",
        "Choice to be made between means and ends",
        "None of the above"
      ],
      correctIndex: 1
    },

    {
      text: "A capitalist economy consists of:",
      options: [
        "Central planning authority",
        "A mechanism to decide what, how and for whom to produce",
        "Both (1) and (2)",
        "None of the above"
      ],
      correctIndex: 1
    },

    {
      text: "The ‘Communist Manifesto’ by Karl Marx & Engels was published in:",
      options: ["1950", "1848", "1849", "1951"],
      correctIndex: 1
    },

    {
      text: "‘Consumer sovereignty’ is a feature of:",
      options: ["Capitalist", "Socialist", "Mixed", "Command"],
      correctIndex: 0
    },

    {
      text: "The central problems relating to allocation of resources are:",
      options: ["What to produce?", "How to produce?", "For whom to produce?", "All the above"],
      correctIndex: 3
    },

    {
      text: "Positive economics deals with—",
      options: ["What is", "What ought to be", "Both 'a' and 'b'", "None of these"],
      correctIndex: 0
    },

    {
      text: "The problem of what goods and services are produced and how much is called—",
      options: ["resource allocation", "choice of technique", "distribution", "macro-economics"],
      correctIndex: 0
    },

    {
      text: "Which of the following is a disadvantage of capitalism?",
      options: [
        "Income will tend to be unevenly distributed",
        "People do not get goods of their choice",
        "Men of initiative are not rewarded",
        "Profits tend to be low"
      ],
      correctIndex: 0
    },

    {
      text: "Human wants are:",
      options: ["Extravagant", "Scarce", "Unlimited", "Restricted"],
      correctIndex: 2
    },

    {
      text: "Resources are scarce in relation to:",
      options: ["Human Wants", "Firm's Profit Motive", "Country's Social Goals", "All of the above"],
      correctIndex: 3
    },

    {
      text: "Business economics is a science because:",
      options: [
        "It establishes a cause and effect relationship",
        "Integrates decision sciences",
        "Follows scientific methods",
        "All of the above"
      ],
      correctIndex: 3
    },

    {
      text: "An economy using all resources on Consumer Goods only cannot provide growth.",
      options: ["Capital Goods only", "Consumer Goods only", "Both (a) and (b)", "Neither"],
      correctIndex: 1
    },

    {
      text: "In deciding 'How to produce', the economy decides:",
      options: ["types of goods", "quantity of goods", "consumer vs capital goods", "methods of production"],
      correctIndex: 3
    },

    {
      text: "Production of Capital Goods vs Consumer Goods relates to:",
      options: ["What to Produce", "How to Produce", "For whom to Produce", "Growth"],
      correctIndex: 0
    },

    {
      text: "Use of Labour or Capital intensive techniques relates to:",
      options: ["What to Produce", "How to Produce", "For whom to Produce", "Growth"],
      correctIndex: 1
    },

    {
      text: "In which system does the Right to Property exist?",
      options: ["Mixed", "Capitalist", "Socialist", "Traditional"],
      correctIndex: 1
    },

    {
      text: "Identify the correct statement:",
      options: [
        "In Capitalist Economy, people cannot spend freely",
        "In Socialist Economy, right to work is guaranteed but choice of occupation is restricted",
        "Socialist Economy has high inequality",
        "USA is purely socialist"
      ],
      correctIndex: 1
    },

    {
      text: "Indian Economy is an example of:",
      options: ["Capitalist", "Socialist", "Mixed", "None"],
      correctIndex: 2
    },

    {
      text: "Features of the book 'Wealth of Nations':",
      options: [
        "It was the first book on economics",
        "Created in 1776",
        "Known as Wealth of Nations",
        "All of the above"
      ],
      correctIndex: 3
    },

    {
      text: "Business economics is part of Applied Economics. Which technique is NOT included?",
      options: ["Regression analysis", "Economic analysis", "Capital budgeting", "Linear programming"],
      correctIndex: 1
    },

    {
      text: "Indian economy is classified as:",
      options: ["Mixed", "Capitalist", "Socialist", "Free market"],
      correctIndex: 0
    },

    {
      text: "Under which economy do consumers have limited freedom?",
      options: ["Socialist", "Mixed", "Capitalist", "Restricted"],
      correctIndex: 0
    },

    {
      text: "An economy with all production privately owned is:",
      options: ["Free Economy", "Capitalist Economy", "Normative Economy", "Both (a) and (b)"],
      correctIndex: 3
    },

    {
      text: "A mixed economy relies on—",
      options: ["Economic planning", "Price mechanism", "Price fixing", "Both (a) and (b)"],
      correctIndex: 3
    },

    {
      text: "In a socialist economy, profit is the basic force. This is—",
      options: ["Correct", "Incorrect", "Partially correct", "None"],
      correctIndex: 1
    },

    {
      text: "One important feature of a capitalist economy is—",
      options: ["Economic planning", "Price mechanism", "Economic qualities", "Social welfare"],
      correctIndex: 1
    },

    {
      text: "Positive economics remains strictly neutral. This means—",
      options: [
        "Positive economics studies facts as they are",
        "It is prescriptive",
        "It is based on ethical beliefs",
        "Only (a) and (b)"
      ],
      correctIndex: 0
    }

  ]
},
      {
        id: "eco_ch2",
        name: "Demand & Supply",
        questions: [
          {
            text: "Law of demand shows—",
            options: ["Inverse relation", "Direct relation", "No relation", "Random"],
            correctIndex: 0
          }
        ]
      }
    ]
  },

  {
    id: "QA",
    name: "Maths",
    chapters: [
      {
        id: "qa_ch1",
        name: "Basics of Accounting",
        questions: [
          {
            text: "Which is real account?",
            options: ["Cash", "Salary", "Capital", "Sales"],
            correctIndex: 0
          }
        ]
      }
    ]
  }
];