import { sign, verify } from "jsonwebtoken";
import { EnvLoad } from "./env_load";

class JWT {
  public async DecodeToken<I>(token: string): Promise<I | null> {
    try {
      const decode = verify(token, EnvLoad.SECRET) as I;
      return decode;
    } catch (error) {
      return null;
    }
  }

  public async GenerateToken(payload: object, time?: string): Promise<string> {
    return sign(payload, EnvLoad.SECRET, {
      expiresIn: `${time ?? "12h"}`,
    });
  }
}

const jwt = new JWT();
export default jwt;
