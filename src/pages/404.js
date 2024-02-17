/* Pagina de error (Pagina no encontrada o permisos insuficientes) */
import Link from "next/link"

export default function Pagina404() {
  return (
    
      <div className="text-center">
        <p className="error mt-10 text-6xl text font-semibold mb-40">Página No Encontrada</p>
        <Link href='/orders'>
            <a className="error-enlace text-4xl hover:text-black">
                Ir a Inicio
            </a>
        </Link>
      </div>
        
  )
}
