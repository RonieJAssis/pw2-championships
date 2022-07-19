import { Router } from "express";
import { Championship } from "./entity/Championship";
import { AppDataSource } from "./data-source";

export default function routes(): Router {
  const router = Router();
  const baseRoute = "/championships";

  router.post(baseRoute, async (req, res) => {
    try {
      const { name, description, location, date } = req.body;

      if (!name || !description || !location || !date) {
        res.status(400).send("Missing required fields");
        return;
      }

      console.log({
        date,
        teste: new Date(date),
      });

      const championship = new Championship();
      championship.name = name;
      championship.description = description;
      championship.date = new Date(date);
      championship.location = location;

      const createdChampionship = await AppDataSource.manager.save(
        championship
      );

      res.status(200).json(createdChampionship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put(`${baseRoute}/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, location, date } = req.body;

      if (!name || !description || !location || !date) {
        res.status(400).send("Missing required fields");
        return;
      }

      const championship = await AppDataSource.manager.findOne(Championship, {
        where: { id: Number(id) },
      });

      if (!championship) {
        res.status(404).send("Championship not found");
        return;
      }

      championship.name = name;
      championship.description = description;
      championship.date = new Date(date);
      championship.location = location;

      const updatedChampionship = await AppDataSource.manager.save(
        championship
      );

      res.status(200).json(updatedChampionship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get(`${baseRoute}/:id`, async (req, res) => {
    try {
      const { id } = req.params;

      const championship = await AppDataSource.manager.findOne(Championship, {
        where: { id: Number(id) },
      });

      if (!championship) {
        res.status(404).send("Championship not found");
        return;
      }

      res.status(200).json(championship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get(baseRoute, async (req, res) => {
    try {
      const championships = await AppDataSource.manager.find(Championship);

      res.status(200).json(championships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete(`${baseRoute}/:id`, async (req, res) => {
    try {
      const { id } = req.params;

      const championship = await AppDataSource.manager.findOne(Championship, {
        where: { id: Number(id) },
      });

      if (!championship) {
        res.status(404).send("Championship not found");
        return;
      }

      await AppDataSource.manager.delete(Championship, {
        where: { id: Number(id) },
      });

      res.status(200).json(championship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
