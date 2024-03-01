import { I18n } from "i18n-js";

const i18n = new I18n({
  fr: {
    balance: "Solde",
    addBalance: "Ajouter mon solde initial",
    welcome: "👋🏻 Hello !\nPour commencez, ajoutez votre solde initial !",
  },
});

i18n.defaultLocale = "fr";
i18n.locale = "fr";

export { i18n };
