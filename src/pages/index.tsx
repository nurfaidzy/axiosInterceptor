import axios from "axios";
import { useEffect } from "react";

interface PokeProperty {
  name: string;
  url: string;
}



export default function Home() {
  const axiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getPokeIdentit = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getchPoke = async () => {
    try {
      const response = await axiosInstance.get("pokemon");

      const pokeIdentity = response.data.results.map(
        async (raw: PokeProperty) => {
          return await getPokeIdentit(raw.url);
        }
      );
      const pokeResult = await Promise.all(pokeIdentity);
      console.log(pokeResult);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getchPoke();
  }, []);

  return (
    <>
      <div className="bg-black h-screen text-white">hai gaes</div>
    </>
  );
}
