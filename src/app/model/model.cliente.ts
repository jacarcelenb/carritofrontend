export interface ModelCliente {
    per_id: number,
    usr_id: number, 
    per_cedula: string, 
    per_nombres: string, 
    per_direccion: string, 
    per_telefono: string, 
    per_correo:string, 
    per_estadocivil: string,
    per_ciudad: string
}

export interface updateClienteDTO{
    per_cedula?: string, 
    per_nombres?: string, 
    per_direccion?: string, 
    per_telefono?: string, 
    per_correo?:string, 
    per_estadocivil?: string,
    per_ciudad?: string
}