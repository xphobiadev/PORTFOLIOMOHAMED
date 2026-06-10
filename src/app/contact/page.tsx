import { headers } from "next/headers";
import { ContactClient } from "./ContactClient";
import { getContactInfo } from "@/lib/services/contact.service";
import type { Locale } from "@/types/i18n";

export default async function ContactPage() {
    const reqHeaders = await headers();
    const locale = (reqHeaders.get("x-locale") || "fr") as Locale;
    
    let contactData = null;
    try {
        contactData = await getContactInfo();
    } catch (err) {
        console.error("Failed to fetch contact data:", err);
    }

    return (
        <ContactClient 
            contactData={contactData} 
            locale={locale} 
        />
    );
}
