import { I18n } from "i18n-js";

const i18n = new I18n({
  fr: {
    home: {
      balance: "Solde",
      addBalance: "Ajouter mon solde initial",
      welcome: "👋🏻 Hello !\nPour commencez, ajoutez votre solde initial !",
    },
    writeInitialBalance: {
      title: "Ajouter mon solde initial",
      placeholder: "1000",
      submit: "Ajouter",
    },
    transactions: {
      initialBalance: "Solde initial",
    },
  },
});

i18n.defaultLocale = "fr";
i18n.locale = "fr";

export { i18n };
