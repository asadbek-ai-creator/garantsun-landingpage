export interface ServiceDataType {
    id: number | string;
    title: string;
    description: string;
    icon: string;
    link: string;
    delay: string;
    active?:boolean;
    image?:string;
}

export const serviceOneData: ServiceDataType[] = [
    {
        id: 1,
        title: "Solar Panel Sales",
        description: "Premium ERA Solar panels for residential, commercial, and industrial use",
        icon: "/img/service/icon/s-icon-1.svg",
        link: "/service-details",
        delay:'.3'
    },
    {
        id: 2,
        title: "Inverter Sales",
        description: "GoodWe GT Series high-efficiency string inverters",
        icon: "/img/service/icon/s-icon-2.svg",
        link: "/service-details",
        delay:'.5',
        active:true
    },
    {
        id: 3,
        title: "Project Design & Consultation",
        description: "Energy demand calculation and system design",
        icon: "/img/service/icon/s-icon-3.svg",
        link: "/service-details",
        delay:'.7'
    },
    {
        id: 4,
        title: "Professional Installation",
        description: "Certified installation team with years of experience",
        icon: "/img/service/icon/s-icon-4.svg",
        link: "/service-details",
        delay:'.9'
    },
    {
        id: 5,
        title: "Technical Service & Maintenance",
        description: "Warranty and post-warranty support",
        icon: "/img/service/icon/s-icon-10.svg",
        link: "/service-details",
        delay:'.3'
    },
    {
        id: 6,
        title: "Monitoring & Diagnostics",
        description: "Online system performance monitoring",
        icon: "/img/service/icon/s-icon-11.svg",
        link: "/service-details",
        delay:'.5'
    },
];
