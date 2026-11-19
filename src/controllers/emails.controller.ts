import { Email } from "../models";
import { IEmail } from "../models/email.model";
import BaseController from "./base.controller";

// nodemailer
// get app specific password from your gmail because it comes with default SMTP

class EmailsController extends BaseController<IEmail> {
  constructor() {
    super(Email);
  }

  listeners() {
    this.broker.on(
      "auth:user:registered",
      (payload: { email: string; username: string }) => {
        this.logger.info("USER CREATED SEND EMAIL OUT!", payload);
      },
    );
  }
}

const emailsController = new EmailsController();

export default emailsController;
