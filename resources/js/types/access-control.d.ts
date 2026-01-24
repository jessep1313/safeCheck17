import { CatalogItem } from "."

export type Access = {
    id: number
    uuid: string
    name: string
    contractor: string
    building: string
    booth: string
    motive: string
    vehicles: string
    tools: string
    devices: string
    expires: string
    created_at: string
}

export type AccessDetail = {
    id: number,
    uuid: string,
    name: string,
    contractor?: string
    identification: string
    who_visits?: string
    building: CatalogItem,
    booth: CatalogItem,
    motive: string,
    moves: [],
    vehicles: [],
    tools: [],
    devices: [],
    expires: string
    created_at: string
}

export type AccessCreateBody = {
    name: string
    contractor: string
    building_id: string
    booth_id: string
    motive: string
    expires: string
}

export type AccessVehicleBody = {
    plate: string
    model: string
    color: string
}

export type AccessToolBody = {
    type: string
    brand: string
    model: string
    quantity: string
}

export type AccessDeviceBody = {
    type: string
    brand: string
    model: string
    quantity: string
}


export type AccessTool = {
    id: number
    created_at: string
    updated_at: string
} & AccessToolBody

export type AccessDevice = {
    id: number
    created_at: string
    updated_at: string
} & AccessDeviceBody

export type AccessItem = {
    id: number,
    title: string,
    description: string
}