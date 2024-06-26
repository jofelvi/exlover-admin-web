export interface RewardCatalogResponseDto {
  id: string;
  name: string;
  title: string;
  subTitle?: string;
  target?: string[];
  type: string;
  description: string;
  discountAmount?: number;
  isUniqueProduct: boolean;
  isPromotionSpecial: boolean;
  awardChoiceId: string;
}


export interface RewardCatalogFormDto {
  name: string;
  title: string;
  subTitle?: string;
  target?: string[];
  type: string;
  description: string;
  discountAmount?: number;
  isUniqueProduct: boolean;
  isPromotionSpecial: boolean;
  awardChoiceId: string;
}
