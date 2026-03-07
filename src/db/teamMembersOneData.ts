import ayzada from "./ayzada.jpg";
import berik from "./berik.jpg";
import davronbek from "./davronbek.jpg";
import nursultan from "./nursultan.jpg";
import sultanbek from "./sultanbek.jpg";
export interface TeamMemberDataType {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
}

export const teamMembersOneData: TeamMemberDataType[] = [
    {
        id: 1,
        name: "Eshbaev Nursultan",
        role: "Основатель",
        company: "GARANT SUN ENERGY",
        image: nursultan
    },
    {
        id: 2,
        name: "Jetkinshekov Sultanbek",
        role: "Основатель и Директор",
        company: "GARANT SUN ENERGY",
        image: sultanbek
    },
    {
        id: 3,
        name: "Kenesbaev Davranbek",
        role: "Главный менеджер",
        company: "GARANT SUN ENERGY",
        image: davronbek
    },
    {
        id: 4,
        name: "Payzullaeva Ayzada",
        role: "Менеджер по продажам",
        company: "GARANT SUN ENERGY",
        image: ayzada
    },
    {
        id: 5,
        name: "Doshchanov Berik",
        role: "Старший бригадир",
        company: "GARANT SUN ENERGY",
        image: berik
    }
];