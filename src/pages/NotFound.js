function NotFound() {
    return (
        <section className="flex flex-col justify-center items-center h-[80vh]">
            <img
                src="https://static.xx.fbcdn.net/rsrc.php/y7/r/s_LXY1yMsCT.svg?_nc_eui2=AeFqi5oifBp8rerve8andUe7EvoiLXyhshMS-iItfKGyE57OVLJzlhQRoPdcWpkx_wHNRhDSMK_BP1yE73vivKw6"
                alt=""
                className="w-40 md:w-60"
            />

            <h1 className="text-xl md:text-3xl font-bold text-error">
                PAGE NOT FOUND!
            </h1>
        </section>
    );
}

export default NotFound;
