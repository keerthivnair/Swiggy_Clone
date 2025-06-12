import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const itemContext = createContext();

let nonveg =
  "https://packagingguruji.com/wp-content/uploads/2022/09/New-Non-Logo.png";
let veg =
  " https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg";

function RestaurantMenu() {
  const { id } = useParams();
  let mainId = id.split("-").at(-1).split("rest")[1];
  // console.log(id.split("-").at(-1).split("rest")[1]);
  const fetchData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=10.0112&lng=76.305&restaurantId=${mainId}&submitAction=ENTER`
    );
    const json = await data.json();

    setResInfo(json?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    let actualMenu =
      (json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card.itemCards || data?.card?.card?.categories
      );
    // console.log(actualMenu);
    console.log(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) => data.card.card.title == "Top Picks"
      )[0])
    setTopPicks(
      json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) => data.card.card.title == "Top Picks"
      )[0]
    );
    setmenuData(actualMenu);
  };
  // console.log(resInfo)
  const [menuData, setmenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [value, setValue] = useState(0);
  const [topPicks, setTopPicks] = useState(null);

  const handleNext = () => {
    setValue(value + 100);
  };
  const handlePrev = () => {
    setValue(value - 100);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[800px]  mx-auto p-4">
        <p className="text-[10px] font-bold text-slate-500 flex gap-1 ">
          {" "}
          <Link to="/">
            {" "}
            <span className="hover:text-slate-700 cursor-pointer ">Home </span>
          </Link>
          /{" "}
          <Link to="/">
            <span className="hover:text-slate-700 cursor-pointer ">
              {" "}
              {resInfo?.city}
            </span>
          </Link>{" "}
          /{" "}
          <span className="text-slate-700 font-bold hover:text-slate-700 cursor-pointer">
            {resInfo?.name}
          </span>
        </p>
        <h1 className="text-2xl pt-10 pb-5 font-bold">{resInfo?.name}</h1>
        <div className="bg-gradient-to-b from-white to-gray-300 w-full h-[206px] p-5  rounded-3xl">
          <div className=" flex flex-col gap-2 w-full border-2 p-4 border-gray-300 bg-white rounded-3xl h-full">
            <div className="flex gap-1 items-center text-md font-bold">
              <FontAwesomeIcon icon={faStar} className="text-green-600" />
              <p className="">{resInfo?.avgRating}</p>
              <p className="">({resInfo?.totalRatingsString})</p>
              <p className="flex items-center justify-center w-1 h-1 bg-gray-500 rounded-full"></p>
              <p className="">{resInfo?.costForTwoMessage}</p>
            </div>
            <div className="flex gap-1 text-md font-bold">
              <p className="text-orange-500 underline ml-1 text-sm">
                {resInfo?.cuisines?.join(", ")}
              </p>
            </div>
            <div className="flex gap-3 ml-1 mt-3">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2  rounded-full bg-gray-300"></div>
                <div className="w-0.5 h-6 bg-gray-300"></div>
                <div className="w-2 h-2  rounded-full bg-gray-300"></div>
              </div>
              <div className="flex flex-col mt-[-5px] gap-2 text-sm font-bold justify-between">
                <div className="flex gap-3">
                  <p>Outlet</p>
                  <p className="text-gray-500">{resInfo?.areaName}</p>
                </div>
                <p>{resInfo?.sla?.slaString?.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          {/* deals for you */}
          <div className="w-full">
            <div className="flex justify-between mt-5 pt-4 pb-5 items-center">
              <h1 className="text-xl font-bold">Deals for you</h1>
              <div className="flex gap-3">
                <div
                  className={`bg-gray-200 py-3 px-3 cursor-pointer rounded-full flex items-center justify-center ${
                    value <= 0 ? " opacity-50" : ""
                  }`}
                  onClick={() => {
                    handlePrev();
                  }}
                >
                  <FontAwesomeIcon
                    className="text-sm"
                    icon="fa-solid fa-arrow-left"
                  />
                </div>
                <div
                  className={`bg-gray-200 py-3 px-3 cursor-pointer rounded-full flex items-center justify-center ${
                    value >= 155 ? " opacity-50" : ""
                  }`}
                  onClick={() => {
                    handleNext();
                  }}
                >
                  <FontAwesomeIcon
                    className="text-sm"
                    icon="fa-solid fa-arrow-right"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-5 overflow-hidden">
              {discountData.map((data) => (
                <Discount data={data} />
              ))}
            </div>
          </div>
          <h2 className="text-center text-gray-500 font-bold mt-12 text-sm">
            {" "}
            M E N U
          </h2>
          <div className="w-full mt-5 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer">
            <div className="w-full p-4  text-md text-center font-semibold text-gray-500 ">
              Search for dishes
            </div>
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="text-gray-500 mr-4.5"
            />
          </div>
          {/* topPicks */}
          { 
            topPicks &&
            <div className="w-full">
              <div className="flex justify-between mt-5 pt-4 pb-5 items-center">
                <h1 className="text-xl font-bold">{topPicks.card.card.title}</h1>
                <div className="flex gap-3">
                  <div
                    className={`bg-gray-200 py-3 px-3 cursor-pointer rounded-full flex items-center justify-center ${
                      value <= 0 ? " opacity-50" : ""
                    }`}
                    onClick={() => {
                      handlePrev();
                    }}
                  >
                    <FontAwesomeIcon
                      className="text-sm"
                      icon="fa-solid fa-arrow-left"
                    />
                  </div>
                  <div
                    className={`bg-gray-200 py-3 px-3 cursor-pointer rounded-full flex items-center justify-center ${
                      value >= 155 ? " opacity-50" : ""
                    }`}
                    onClick={() => {
                      handleNext();
                    }}
                  >
                    <FontAwesomeIcon
                      className="text-sm"
                      icon="fa-solid fa-arrow-right"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 overflow-hidden">
                {topPicks.card.card.carousel.map(({creativeId, dish:{info:{defaultPrice,price}}}) => (
                  // <Discount data={data} />
                  <div className="min-w-[384px] h-[395px] relative">
                    <img className="w-full h-full " src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`} alt="" srcSet="" />
                    <div className="absolute bottom-3 p-5 w-full flex justify-between items-center">
                      <p className="text-xl font-semibold text-white">₹ {defaultPrice/100 || price/100}</p>
                      <button className="bg-white text-green-600 rounded-xl py-2 px-12 font-bold text-xl">ADD</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }

          <div className="w-full">
            {menuData.map(
              (
                {
                  card: {
                    card: { itemCards, title },
                    card,
                  },
                },
                i
              ) => (
                <itemContext.Provider value={{ title, itemCards, card }}>
                  <MenuCard />
                </itemContext.Provider>
              )
            )}
          </div>
          <hr className=" mx-auto mt-7 text-gray-100" />
        </div>
      </div>
    </div>
  );
}

function MenuCard({ title_card }) {
  function toggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  const { title, itemCards, card } = useContext(itemContext);
  const [isOpen, setIsOpen] = useState(title_card ? false : true);

  if (itemCards) {
    return (
      <div>
        <div className="mt-10">
          <div className="flex justify-between w-[100%]">
            <h1 className="flex items-center">
              {title ? (
                <p className="font-extrabold text-xl">{title}</p>
              ) : (
                <p className="font-bold text-md">{title_card}</p>
              )}
              <div className="font-bold text-md ml-1">({itemCards.length})</div>
              {/* {console.log(card)} */}
            </h1>
            {isOpen ? (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-up"
                className="text-xl text-gray-700 cursor-pointer"
                onClick={(e) => toggleDropDown(e)}
              />
            ) : (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-down"
                className="text-xl text-gray-700 cursor-pointer"
                onClick={(e) => toggleDropDown(e)}
              />
            )}
          </div>
          {isOpen && <DetailMenu />}
        </div>

        {title ? <hr className="border-gray-100 border-8 my-5" /> : ""}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="font-extrabold text-xl">{card.title}</h1>

        <DetailMenu />
        <hr className="border-gray-100 border-8 my-5" />
      </div>
    );
  }
}

function DetailMenu() {
  const { itemCards, card } = useContext(itemContext);

  if (itemCards) {
    return (
      <div className="my-7">
        {/* {console.log(itemCards.card.info)} */}
        {itemCards.map(
          (
            {
              card: {
                info: {
                  name,
                  defaultPrice,
                  price,
                  itemAttribute: { vegClassifier },
                  ratings: {
                    aggregatedRating: { rating, ratingCountV2 },
                  },
                  description,
                  imageId,
                },
              },
            },
            id
          ) => {
            const [isTruncate, setIsTruncate] = useState(false);
            const [isExpanded, setIsExpanded] = useState(false);
            let textRef = useRef("");
            useEffect(() => {
              if (textRef.current) {
                const { offsetHeight, scrollHeight } = textRef.current;
                setIsTruncate(offsetHeight < scrollHeight);
              }
            }, []);
            const handleClick = () => {
              setIsExpanded(!isExpanded);
            };

            return (
              <>
                <div className="flex justify-between w-full min-h-[182px]">
                  <div className="w-[70%] flex flex-col justify-between items-start">
                    <div>
                      {" "}
                      {vegClassifier == "VEG" ? (
                        <img className="h-[17px]" src={veg}></img>
                      ) : (
                        <img className="h-[32px]" src={nonveg} alt="" />
                      )}
                      <h2 className="font-bold text-lg text-gray-700">
                        {name}
                      </h2>
                      <p className="font-semibold text-md">
                        {"₹ " +
                          (defaultPrice
                            ? Math.floor(defaultPrice / 100)
                            : Math.floor(price / 100))}
                      </p>
                    </div>

                    {rating ? (
                      <div className="flex gap-1">
                        <p>
                          <FontAwesomeIcon
                            icon="fa-solid fa-star"
                            style={{ color: "#36ec6d" }}
                            className="text-sm"
                          />
                        </p>
                        <span>
                          <span>{rating} </span>
                          <span className="font-bold text-gray-500">
                            ({ratingCountV2})
                          </span>
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {description ? (
                      <span
                        ref={textRef}
                        className={`line-clamp-${
                          isExpanded ? "none" : 2
                        } text-gray-500 font-semibold text-md`}
                      >
                        {description}
                      </span>
                    ) : (
                      ""
                    )}
                    {isTruncate && (
                      <button
                        className="font-bold cursor-pointer"
                        onClick={handleClick}
                      >
                        {isExpanded ? (
                          <p className="font-bold ml-[5px]">less</p>
                        ) : (
                          "more"
                        )}
                      </button>
                    )}
                  </div>
                  <div className="cursor-pointer w-[20%] relative h-full">
                    {imageId ? (
                      <>
                        <img
                          src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                            imageId
                          }
                          alt=""
                          className="aspect-square rounded-xl"
                        />
                        <button className="bg-white absolute bottom-[-23px] left-6 border px-8 py-2 rounded-md shadow-xl shadow-gray-200 border-gray-300 text-green-600 font-bold text-lg">
                          ADD
                        </button>
                      </>
                    ) : (
                      <button className="bg-white absolute bottom-[-120px] left-6 border px-8 py-2 rounded-md shadow-xl shadow-gray-200 border-gray-300 text-green-600 font-bold text-lg">
                        ADD
                      </button>
                    )}
                  </div>
                </div>
                {id == itemCards.length - 1 ? (
                  ""
                ) : (
                  <hr className="my-5 border-gray-300" />
                )}
              </>
            );
          }
        )}
      </div>
    );
  } else {
    const { categories } = card;
    // console.log(categories[0].title)
    return (
      <div className="">
        {categories.map((data, id) => (
          <div>
            <itemContext.Provider value={{ itemCards: data.itemCards }}>
              <MenuCard title_card={data.title} />
            </itemContext.Provider>
            {id == categories.length - 1 ? (
              ""
            ) : (
              <hr className="my-5 border-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  }
}

function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  // console.log(header)
  return (
    <div className="flex gap-2 items-center min-w-[329px] h-[76px] border-1 border-gray-300 rounded-3xl p-5 mt-3">
      <img
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
          offerLogo
        }
        alt=""
        className="w-12 h-12"
      />
      <div>
        <h2 className="text-md font-extrabold">{header}</h2>
        <p className="text-xs text-gray-500 font-bold">{couponCode}</p>
      </div>
    </div>
  );
}

export default RestaurantMenu;
