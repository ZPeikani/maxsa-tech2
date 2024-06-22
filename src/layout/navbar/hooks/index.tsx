import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAccessCookie,
  getCartItemDetails,
  getCartItems,
  getUserInfo,
  signInUser,
  signUpNewUser,
} from "../services";
import { ICart, IUser, IWishlist } from "./types";

export const useAccessCookie = () => {
  return useQuery({
    queryKey: ["access"],
    queryFn: () => fetchAccessCookie(),
    staleTime: Infinity,
    refetchInterval: 100,
  });
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
    refetchOnWindowFocus: false,
  });
};

export const useSignUpNewUser = () => {
  return useMutation({
    mutationFn: (data: {
      newUserData: IUser;
      cartData: ICart;
      wishlistData: IWishlist;
    }) => signUpNewUser(data.newUserData, data.cartData, data.wishlistData),
  });
};

export const useSignInUser = () => {
  return useMutation({
    mutationFn: signInUser,
  });
};

export const useGetCartItems = (userId) => {
  return useQuery({
    queryKey: ["cartItems", userId],
    queryFn: () => getCartItems(userId),
    refetchOnWindowFocus: false,
  });
};

export const useGetCartItemDetails = (productId: number) => {
  return useQuery({
    queryKey: ["cartItemDetails", productId],
    queryFn: () => getCartItemDetails(productId),
    refetchOnWindowFocus: false,
  });
};
