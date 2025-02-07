import { NavLink } from 'react-router-dom';

export default function Error() {

    return (
        <div className='text-center'>
            <h1 className="text-[200px] text-sky-500">404</h1>
            <p className="text-6xl">Oups ... </p>
            <p className="text-2xl mt-12 mb-16">Il semblerait que la page que vous cherchez n’existe pas.</p>
            <NavLink to='/' className="w-[196px] border border-gray-400 px-8 py-3 bg-gray-200 rounded-xl shadow hover:bg-gray-300">
                Retourner sur la page d’accueil
            </NavLink>
        </div>
    )
}