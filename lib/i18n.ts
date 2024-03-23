import { I18n } from "i18n-js";

const i18n = new I18n({
  fr: {
    expenseLabel: {
      rent: "🏠 Loyer",
      internet: "🌐 Internet",
      insurance: "🛡️ Assurance",
      water: "💧 Eau",
      electricity: "⚡ Electricité",
      gas: "🔥 Gaz",
      subscription: "📺 Abonnement",
      other: "📦 Autre",
    },
    expenseLabelEmoji: {
      rent: "🏠",
      internet: "🌐",
      insurance: "🛡️",
      water: "💧",
      electricity: "⚡",
      gas: "🔥",
      subscription: "📺",
      other: "📦",
    },
    onboarding: {
      title: "BeaconFlow!",
      text: "Avant de commencer, nous avons besoin de quelques informations pour préparer un bon suivit de votre budget.",
      salary: {
        label: "Votre salaire mensuel net",
        placeholder: "Salaire",
      },
      recurrentExpenses: {
        label: "Vos dépenses récurrentes",
        hint: "Lorsque vous recevrez votre salaire, ces dépenses seront automatiquement déduites de votre solde.",
        addExpense: "Ajouter une dépense",
        delete: "Supprimer",
        continue: "Continuer",
      },
      addRecurrentExpense: {
        title: "Dépense récurrente",
        name: "Nom de la dépense",
        namePlaceholder: "Loyer",
        amount: "Montant",
        amountPlaceholder: "500",
        label: "Label",
        add: "Ajouter",
      },
      balance: {
        label: "Votre solde actuel",
        placeholder: "Solde",
      },
    },
    balanceCard: {
      balance: "Solde",
    },
    restPerMonth: {
      title: "Repartition de votre solde mensuel ({{n}}€)",
      savings: "Épargne",
      debt: "Dettes",
      spending: "Dépenses",
    },
    lastTransactions: {
      title: "Dernières transactions",
      noTransaction: "Vous n'avez pas encore de transactions,\najoutez-en !",
    },
    addTransaction: {
      title: "Ajouter une transaction",
      expense: "Dépense",
      income: "Revenu",
      amount: "Montant",
      name: "Nom",
      namePlaceholder: "Courses",
      description: "Description",
      descriptionPlaceholder: "Achat de nourriture",
      add: "Ajouter",
    },
  },
});

i18n.defaultLocale = "fr";
i18n.locale = "fr";

export { i18n };
