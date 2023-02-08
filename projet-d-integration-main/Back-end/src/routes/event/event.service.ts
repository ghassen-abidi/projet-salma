import event from "../../models/event";
export const create = async (data: any, image: string) => {
  const e = await event.create({
    ...data,
    image,
  });
  return e;
};

export const getall = () => {
  return event.find();
};

export const unchecked = () => {
  return event.find({ approuve: false });
};

export const approuve = (id: string) => {
  return event.findByIdAndUpdate(
    id,
    { approuve: true },
    {
      new: true,
    }
  );
};

export const reject = (id: string) => {
  return event.findByIdAndDelete(id);
};
//getAllEvent
export const getAllEvent = () => {
  return event.find({ approuve: true });
};

//get event by id
export const getEventById = (id: any) => {
  return event.findById(id);
};
