import { I18n } from "i18n-js";

const i18n = new I18n({
  fr: {
    onboarding: {
      title: "BeaconFlow!",
      text: "Avant de commencer, nous avons besoin de quelques informations pour préparer un bon suivit de votre budget.",
      salary: {
        label: "Votre salaire mensuel net",
        placeholder: "Salaire",
      },
    },
  },
});

i18n.defaultLocale = "fr";
i18n.locale = "fr";

export { i18n };
