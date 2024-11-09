import { Request, Response } from 'express';
import Country, { ICountry } from '../models/Country';

export const listCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar los países' });
  }
};

export const addCountry = async (req: Request, res: Response): Promise<void> => {
  const { name, capital, flagUrl } = req.body;

  if (!name || !capital || !flagUrl) {
    res.status(400).json({ error: 'Todos los campos son obligatorios' });
    return;
  }

  try {
    const newCountry = new Country({ name, capital, flagUrl });
    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el país' });
  }
};