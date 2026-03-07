import azamatKaa from "./azamat-kaa.jpg";
import nokisBazar from "./nokis-bazar.jpg";
import majitJuzimgul from "./majit-juzimgul.jpg";
import nokisVinozavod from "./nokis-vinozavod.jpg";
import gafurAgro from "./gafur-agro.jpg";
import aydinAdilbek from "./aydin-adilbek.jpg";
import erpolatShinpolat from "./erpolat-shinpolat.jpg";
export interface ProjectDataType {
    id: number;
    title: string;
    power: string;
    location: string;
    type: string;
    image: string;
}

export const projectsData: ProjectDataType[] = [
    {
        id: 1,
        title: "Azamat Kaa",
        power: "110 kW",
        location: "Каракалпакстан",
        type: "Наземная система",
        image: azamatKaa
    },
    {
        id: 2,
        title: "No'kis Orayliq Bazar",
        power: "3 Megawatt",
        location: "г. Нукус",
        type: "Коммерческая система",
        image: nokisBazar
    },
    {
        id: 3,
        title: "Majit Juzimgul",
        power: "140 kW",
        location: "Каракалпакстан",
        type: "Наземная система",
        image: majitJuzimgul
    },
    {
        id: 4,
        title: "No'kis Vinozavod",
        power: "100 kW",
        location: "г. Нукус",
        type: "Промышленная система",
        image: nokisVinozavod
    },
    {
        id: 5,
        title: "Gafur Agro",
        power: "200 kW",
        location: "Каракалпакстан",
        type: "Агросистема",
        image: gafurAgro
    },
    {
        id: 6,
        title: "Aydin Adilbek",
        power: "100 kW",
        location: "Каракалпакстан",
        type: "Наземная система",
        image: aydinAdilbek
    },
    {
        id: 7,
        title: "Erpolat Shinpolat",
        power: "50 kW",
        location: "Каракалпакстан",
        type: "Наземная система",
        image: erpolatShinpolat
    }
];
