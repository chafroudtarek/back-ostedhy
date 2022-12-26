import { CourierClient } from "@trycourier/courier";
import { ApplicationError } from "../shared/applicationError";
import { AuthError } from "../shared/errors/authError";

const courier = CourierClient({
  authorizationToken: "dk_prod_Z7A7VZRXKEM2NXHH7GFT1CAYRMZ1",
});

export const sendmail = async (email: string, title: string, body: string) => {
  await courier.send({
    message: {
      to: {
        email: email,
      },
      content: {
        title: title,
        body: body,
      },
      routing: {
        method: "single",
        channels: ["email"],
      },
    },
  });
};

export const sendsms = async (phone: string, title: string, body: string) => {
  await courier.send({
    message: {
      to: {
        phone_number: "+216" + phone,
      },
      content: {
        title: title,
        body: body,
      },
      routing: {
        method: "single",
        channels: ["sms"],
      },
    },
  });
};
