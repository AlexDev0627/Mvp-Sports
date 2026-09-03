import teamsBg from "../../assets/mlbshop.jpg";

export function TeamsBanner() {
    return (
        <section className="relative w-full overflow-hidden h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh]">
            <img
                src={teamsBg}
                alt="Equipos MLB y LVBP"
                className="w-full h-full object-cover object-left md:object-center"
            />
            {/* Top fade: blends from page bg into image */}
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-20 sm:h-28 md:h-32 bg-gradient-to-b from-black to-transparent"
            />
            {/* Bottom fade: blends image into next section */}
            <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-32 sm:h-40 md:h-48 lg:h-56 bg-gradient-to-b from-transparent to-black"
            />
        </section>
    );
}
