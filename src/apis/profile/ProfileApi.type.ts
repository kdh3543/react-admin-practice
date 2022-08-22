export type ProfileReturnType = {
  code: number;
  data: {
    address: string | null;
    username: string;
    profileImageUrl: string;
    connects: Array<{
      account: string;
      activatedAt: string;
      id: number;
      type: string;
    }>;
  };
  message: string;
};

export type UpdateProfileParams = {
  username: string;
};
export type UpdateProfileReturnType = ProfileReturnType;

export type UploadProfileImageParmas = FormData;
export type UploadProfileImageReturnType = {
  profileImageUrl: string;
};
