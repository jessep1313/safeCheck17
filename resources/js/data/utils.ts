import { CatalogItem } from "@/types";
import { toast } from "sonner";


export const getCatalogAvailableVehicles = async(certification_id: string): Promise<CatalogItem[]> => {
    try {
        const response = await fetch(route('utils.catalog.available-vehicles', { certification_id }));
        if(response.ok) {
            return await response.json() ;
        }else {
            return [];
        }
    } catch (error) {
        console.log(error);
        toast.error('Error al recuperar el catalogo de vehículos.');
        return [];
    }
}