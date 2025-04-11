import arceus from "@/assets/images/arceus.webp";
import giratina from "@/assets/images/giratina.webp";
import hoOh from "@/assets/images/ho-oh.webp";
import lugia from "@/assets/images/lugia.webp";
import mew from "@/assets/images/mew.webp";
import rayquaza from "@/assets/images/rayquaza.webp";
import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";

export const Home = () => {
  const pokemonsTest = [
    {
      name: "Lugia",
      imageUrl: lugia,
      votes: 100,
    },
    {
      name: "Arceus",
      imageUrl: arceus,
      votes: 10,
    },
    {
      name: "Giratina",
      imageUrl: giratina,
      votes: 20,
    },
    {
      name: "Ho-oh",
      imageUrl: hoOh,
      votes: 15,
    },
    {
      name: "Mew",
      imageUrl: mew,
      votes: 25,
    },
    {
      name: "Rayquaza",
      imageUrl: rayquaza,
      votes: 35,
    },
  ];

  return (
    <Layout>
      <div className="grid grid-rows-2 grid-cols-3 place-items-center h-full p-10 gap-4 text-white">
        {pokemonsTest.map((pokemon, index) => (
          <div
            key={index}
            className="flex flex-col border-1 border-solid border-gray-600 h-10/12 w-80 group hover:border-white"
          >
            <div className="w-full h-4/5 overflow-hidden">
              <img
                className="h-full w-full group-hover:scale-105 transition-transform duration-900"
                src={pokemon.imageUrl}
                alt={`${pokemon.name} image url`}
              />
            </div>
            <div className="h-1/5">
              <div className="text-lg font-bold p-2 group-hover:text-light-primary h-6/12">
                {pokemon.name}
              </div>
              <div className="flex border-t-1 border-solid border-gray-600 p-2 justify-between h-6/12">
                <div className="flex flex-col">
                  <span className="text-gray-600">Total votes</span>
                  <span>{pokemon.votes}</span>
                </div>
                <div className="h-10 w-px bg-gray-600 mx-4 my-1" />
                <Button
                  text="Vote"
                  type="button"
                  customStyles="px-8"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
