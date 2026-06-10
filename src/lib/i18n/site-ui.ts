import type { Locale } from "@/types/i18n";

type Triple = Record<Locale, string>;

function pick(m: Triple, locale: Locale): string {
    return (m[locale] || m.fr || m.en).trim();
}

export function getFooterUi(locale: Locale) {
    return {
        blurb: pick(
            {
                fr: "Un créatif multidisciplinaire transformant les idées en expériences exceptionnelles.",
                en: "A multidisciplinary creative turning ideas into exceptional experiences."
            },
            locale
        ),
        navTitle: pick({ fr: "NAVIGATION", en: "NAVIGATION" }, locale),
        home: pick({ fr: "Accueil", en: "Home" }, locale),
        works: pick({ fr: "Réalisations", en: "My works" }, locale),
        about: pick({ fr: "À propos", en: "About" }, locale),
        contact: pick({ fr: "Contact", en: "Contact" }, locale),
        resourcesTitle: pick({ fr: "RESSOURCES", en: "RESOURCES" }, locale),
        blog: pick({ fr: "Blog", en: "Blog" }, locale),
        faq: pick({ fr: "FAQ", en: "FAQ" }, locale),
        press: pick({ fr: "Presse", en: "Press" }, locale),
        accountTitle: pick({ fr: "COMPTE", en: "ACCOUNT" }, locale),
        dashboard: pick({ fr: "Tableau de bord", en: "Dashboard" }, locale),
        login: pick({ fr: "Connexion", en: "Sign in" }, locale),
        signup: pick({ fr: "Inscription", en: "Sign up" }, locale)
    };
}

export function getContactUi(locale: Locale) {
    return {
        toastErr: pick(
            {
                fr: "Envoi impossible.",
                en: "Could not send message."
            },
            locale
        ),
        toastOk: pick(
            {
                fr: "Message envoyé.",
                en: "Message sent."
            },
            locale
        ),
        kicker: pick({ fr: "CONTACT", en: "CONTACT" }, locale),
        titleBefore: pick({ fr: "UN PROJET EN ", en: "A PROJECT IN " }, locale),
        titleHighlight: pick({ fr: "TÊTE ?", en: "MIND?" }, locale),
        desc: pick(
            {
                fr: "Collaborons et créons ensemble des expériences inoubliables.",
                en: "Let's collaborate and build unforgettable experiences together."
            },
            locale
        ),
        name: pick({ fr: "NOM", en: "NAME" }, locale),
        namePh: pick({ fr: "Votre nom", en: "Your name" }, locale),
        email: pick({ fr: "EMAIL", en: "EMAIL" }, locale),
        emailPh: pick({ fr: "email@site.com", en: "email@site.com" }, locale),
        subject: pick({ fr: "SUJET", en: "SUBJECT" }, locale),
        subjectPh: pick({ fr: "Sujet", en: "Subject" }, locale),
        message: pick({ fr: "MESSAGE", en: "MESSAGE" }, locale),
        messagePh: pick(
            {
                fr: "Parle-moi de ton projet...",
                en: "Tell me about your project..."
            },
            locale
        ),
        send: pick({ fr: "ENVOYER", en: "SEND" }, locale),
        sending: pick({ fr: "Envoi...", en: "Sending..." }, locale),
        emailLabel: pick({ fr: "EMAIL", en: "EMAIL" }, locale),
        locationTitle: pick({ fr: "LOCALISATION", en: "LOCATION" }, locale),
        locationValue: pick(
            {
                fr: "Casablanca, Maroc",
                en: "Casablanca, Morocco"
            },
            locale
        ),
        availabilityTitle: pick({ fr: "DISPONIBILITÉ", en: "AVAILABILITY" }, locale),
        availabilityText: pick(
            {
                fr: "Disponible pour projets freelance et collaborations.",
                en: "Available for freelance projects and collaborations."
            },
            locale
        ),
        phoneTitle: pick({ fr: "TÉLÉPHONE", en: "PHONE" }, locale),
        phoneValue: pick({ fr: "+212 6 00 89 15 94", en: "+212 6 00 89 15 94" }, locale)
    };
}
