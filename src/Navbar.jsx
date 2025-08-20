// import { useState, useEffect } from "react";
// import "./Navbar.css";

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [genres, setGenres] = useState([]);

//     useEffect(() => {
//         const fetchGenres = async () => {
//             try {
//                 const res = await fetch(
//                     `https://api.themoviedb.org/3/genre/movie/list?api_key=5dc1ad459cf1db2a5a4406ee2dabbbe0&language=en-US`
//                 );
//                 const data = await res.json();
//                 setGenres(data.genres || []);
//             } catch (err) {
//                 console.error("Error fetching genres:", err);
//             }
//         };

//         fetchGenres();
//     }, []);

//     return (
//         <div className="navbar">
//             <ul>
//                 <li>Home</li>
//                 <li className="dropdown">
//                     <span onClick={() => setIsOpen(!isOpen)}>Mood ▾</span>
//                     {isOpen && (
//                         <ul className="dropdown-menu">
//                             {genres.length > 0 ? (
//                                 genres.map((genre) => (
//                                     <li key={genre.id}>{genre.name}</li>
//                                 ))
//                             ) : (
//                                 <li>Loading...</li>
//                             )}
//                         </ul>
//                     )}
//                 </li>
//             </ul>
//             <div className="search-box">
//                 <input type="text" placeholder="Search..." />
//             </div>
//         </div>
//     );
// }


import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=5dc1ad459cf1db2a5a4406ee2dabbbe0&language=en-US`
                );
                const data = await res.json();
                setGenres(data.genres || []);
            } catch (err) {
                console.error("Error fetching genres:", err);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="navbar">
            <ul>
                <li>Home</li>
                <li className="dropdown">
                    <span onClick={() => setIsOpen(!isOpen)}>Mood ▾</span>
                    {isOpen && (
                        <ul className="dropdown-menu">
                            {genres.length > 0 ? (
                                genres.map((genre) => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))
                            ) : (
                                <li>Loading...</li>
                            )}
                        </ul>
                    )}
                </li>
            </ul>
            <div className="search-box">
                <input type="text" placeholder="Search..." />
            </div>
        </div>
    );
}