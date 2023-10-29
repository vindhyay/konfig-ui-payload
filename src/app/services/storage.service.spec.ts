import { TestBed } from "@angular/core/testing";

import { StorageService } from "./storage.service";
import { Tokens } from "../modules/auth/models";
import { ACCESS_TOKEN_EXPIRY } from "../state/constants";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set and get a token", () => {
    const tokenData = { type: "access", token: "accessToken", expiryTime: 3600 };

    service.setToken(tokenData);

    expect(service.getToken("access")).toBe("accessToken");
  });

  it("should save tokens data", () => {
    const tokens: Tokens = {
      accessToken: "access_token",
      accessTokenExpirationTime: 3600,
      refreshToken: "refresh_token",
      refreshTokenExpirationTime: 7200,
    };

    service.saveTokensData(tokens);
    expect(service.getCookie(ACCESS_TOKEN_EXPIRY)).toBeDefined();
  });

  it("should get time to expiration", () => {
    const tokens: Tokens = {
      accessToken: "access_token",
      accessTokenExpirationTime: 3600,
      refreshToken: "refresh_token",
      refreshTokenExpirationTime: 7200,
    };

    service.saveTokensData(tokens);

    const timeToExpiration = service.getTimeToExpiration(ACCESS_TOKEN_EXPIRY);
    expect(timeToExpiration).toBeCloseTo(3600000, -10); // Adjust tolerance as needed
  });

  it("should set and get user data", () => {
    const userData = { name: "John" };

    service.user = userData;

    expect(service.user).toEqual(userData);
  });

  it("should clear data", () => {
    const userData = { name: "John" };

    service.user = userData;
    service.clear();

    expect(service.user).toBeNull();
    expect(service.getCookie(ACCESS_TOKEN_EXPIRY)).toBeNull();
  });
});
