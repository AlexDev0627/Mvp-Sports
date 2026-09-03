import { useEffect } from "react";

interface MetaProps {
    title: string;
    description?: string;
}

export function Meta({ title, description }: MetaProps) {
    useEffect(() => {
        document.title = title;
        if (description) {
            let meta = document.querySelector(
                'meta[name="description"]',
            ) as HTMLMetaElement | null;
            if (!meta) {
                meta = document.createElement("meta");
                meta.name = "description";
                document.head.appendChild(meta);
            }
            meta.content = description;
        }
    }, [title, description]);
    return null;
}
