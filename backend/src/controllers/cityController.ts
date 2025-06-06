import axios from "axios";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const getCities = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "cities.json");
    const rawCities = fs.readFileSync(filePath, "utf-8");
    const cities: string[] = JSON.parse(rawCities).data;
    // const filePath = path.join(__dirname, "..", "data", "provincesId.json");
    // const rawProvince = fs.readFileSync(filePath, "utf-8");
    // const provinceIds: string[] = JSON.parse(rawProvince).data;

    // const province_ids = provinceIds.map((id: string) => id);

    // type CityType = {
    //   id: string;
    //   province_id: string;
    //   name: string;
    // };

    // let cities: CityType[] = [];

    // for (const provinceId of provinceIds) {
    //   const response = await axios.get<CityType[]>(
    //     `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    //   );
    //   cities.push(...response.data);
    // }

    return res.status(200).json({
      data: cities,
      message: "Successfully get cities",
      status: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to get data cities",
      status: "Failed",
    });
  }
};
