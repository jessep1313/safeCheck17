import { TourRow } from "@/types/tours";
import { useState } from "react"

export default function useTours () {

    const [openDetail, setOpenDetail] = useState(false)
    const [tour, setTour] = useState<TourRow|null>(null);
    
    const handleOpenDetail = (data: TourRow) => {
        setOpenDetail(true)
        setTour(data)
    }
    const handleCloseDetail = () => {
        setOpenDetail(false)
        setTour(null)
    }

    return {
        tour,
        openDetail,
        handleOpenDetail,
        handleCloseDetail,
    }
}