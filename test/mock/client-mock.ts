import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import client from "../../src/util/database_client";

jest.mock("../../src/util/database_client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = client as unknown as DeepMockProxy<PrismaClient>;
