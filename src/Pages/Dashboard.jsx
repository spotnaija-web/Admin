import cominsgSoon from "/images/urban-line-no-data-found-2.png";

export default function Dashboard(){
    return (
        <>
        <div className="bg-white-A700 flex flex-col font-inter items-center justify-center mx-auto w-full h-screen">
          <div className="flex flex-col items-center justify-center">
            <p className="bg-white-A700 text-[rgb(29,36,69)] text-center text-xl md:text-2xl font-bold mb-4">Other dashboard content showing metrics can be added here later on.</p>
            <img
              className="h-96 md:h-128"
              src={cominsgSoon}
              alt="coming Soon"
            />
          </div>
        </div>
        </>
    );
}