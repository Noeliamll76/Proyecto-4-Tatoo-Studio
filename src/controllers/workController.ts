import { Request, Response } from "express";
import { Tattoo_artist } from "../models/Tattoo_artist";
import { Work } from "../models/Work";
import { Appointment } from "../models/Appointment";
// import { workerData } from "worker_threads";

const registerWork = async (req: Request, res: Response) => {
  try {
    const createdBy_id = req.body.createdBy_id
    const description = req.body.description
    const image = req.body.image
    
    const artist = await Tattoo_artist.findOneBy({ id: parseInt(req.body.createdBy_id )})
    if (!artist) {
      return res.json({ message: 'Tattoo artist doesn`t exist', })
    }

    const newWork = await Work.create({
      createdBy_id: parseInt(createdBy_id),
      description: description,
      image:image,
    }).save()

    return res.json({
      success: true,
      message: "Work created succesfully",
      token: newWork
    }
    )
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Work cannot be created",
      error: error
    })
  }
}

const loginWorkArtist = async (req: Request, res: Response) => {
  try {
    if (req.token.id !== parseInt(req.params.id))
      if (req.token.role !== "super_admin")
        return res.status(400).json(
          {
            success: false,
            message: 'Tattoo artist incorrect',
          })

    const artist = await Work.findBy({
      createdBy_id: parseInt(req.params.id)
    })
    if (!artist) {
      return res.status(500).json({
        success: false,
        message: "This tattoo artist has no published works",
      })
    }

    const workArtist = await Work.findBy(
      {
         createdBy_id: parseInt(req.params.id)
      },
    )
    return res.json(
      {
        success: true,
        message: `These are your works: `,
        data: workArtist
      })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Works login failed",
      error: error
    });
  }
};

const getAllWorks = async (req: Request, res: Response) => {
  try {
    const works = await Work.find({
      select: {
        id: true,
        createdBy_id: true,
        description: true,
        image: true,
      },
      relations: {
        works_artist: true,
        
      },
    });

    if (!works) {
      return res.status(500).json({
        success: false,
        message: "There are no published works",
      })
    }

    const finalWorks = works.map((work) => ({
      id: work.id,
      Tatoo_artist: work.works_artist.name,
      image: work.image,
      description: work.description,
    }));
 
    return res.json(
      {
        success: true,
        message: `These are all works: `,
        data: finalWorks
      })

  } catch (error) {
      return res.status(500).json({
      success: false,
      message: "Works login failed",
      error: error,
    });
  }
};

const createAppointmentByWork  = async (req: Request, res: Response) => {
  try {
    const work_id = req.body.work_id
    const date = req.body.date
    const shift = (req.body.shift).toLowerCase()
    const type_work = req.body.type_work
  
    const correctDate = date.replace(/\//g, "-");
    const validar = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    const validarDate = validar.test(correctDate)
    if (validarDate === false) {
      return res.json(
        {
          message: validarDate,
          error: "Date incorrect, must be YYYY-MM-DD"
        }
      );
    }

    const workSelect = await Work.findOneBy({
      id: parseInt(req.body.work_id)
    })
    if (!workSelect) {
      return res.status(400).json(
        {
          success: false,
          message: 'the work does not exist ',
        }
      )
    }

    const artistNotAvailable = await Appointment.findOne({
      where:
      {
        artist_id: workSelect.createdBy_id,
        date: correctDate,
        shift: shift
      },
    });
    if (artistNotAvailable) {
      return res.json({
        error: "This tattoo artist has that date and shift busy ",
      });
    }
    if (shift != "mañana" && shift != "tarde") {
      return res.json({
        error: "The shift must be mañana or tarde",
      });
    }
    if (type_work != "piercing" && type_work != "tattoo") {
      return res.json({
        error: "The type_work must be piercing or tattoo",
      });
    }
    const appointmentCreated = await Appointment.create(
      {
        user_id: req.token.id,
        artist_id: workSelect.createdBy_id,
        date: correctDate,
        shift: shift,
        type_work: type_work,
        description: workSelect.description,
      }).save()

    return res.json(
      {
        success: true,
        message: "Appointment created",
        data: appointmentCreated
      }
    );
  } catch (error) {
    return res.status(500).json(
      {
        success: false,
        message: "Appointment creation failed",
        error: error
      }
    );
  }
}

export { registerWork, loginWorkArtist, getAllWorks, createAppointmentByWork  }
