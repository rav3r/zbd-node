import { API_URL, API } from './constants';
import { postData, getData, patchData } from './utils';
import {
  ChargeOptionsType,
  KeysendOptionsType,
  ChargeDataResponseType,
  WalletDataResponseType,
  BTCUSDDataResponseType,
  SendPaymentOptionsType,
  DecodeChargeOptionsType,
  DecodeChargeResponseType,
  ProdIPSDataResponseType,
  StaticChargeOptionsType,
  KeysendDataResponseType,
  InternalTransferOptionsType,
  StaticChargeDataResponseType,
  WithdrawalRequestOptionsType,
  SendGamertagPaymentOptionsType,
  InvoicePaymentDataResponseType,
  SupportedRegionDataResponseType,
  InternalTransferDataResponseType,
  GetWithdrawalRequestDataResponseType,
  CreateWithdrawalRequestDataResponseType,
  FetchChargeFromGamertagOptionsType,
  GamertagTransactionDataResponseType,
  FetchUserIdByGamertagDataResponseType,
  FetchGamertagByUserIdDataResponseType,
  SendLightningAddressPaymentOptionsType,
  FetchChargeFromGamertagDataResponseType,
  ValidateLightningAddressDataResponseType,
  SendLightningAddressPaymentDataResponseType,
  CreateChargeFromLightningAddressOptionsType,
  SendGamertagPaymentDataResponseType,
  FetchChargeFromLightningAddressDataResponseType,
} from './types/index';

class zbd {
  apiBaseUrl: string;
  apiCoreHeaders: {apikey: string };  

  constructor(apiKey: string, apiBaseUrl?: string = API_URL) {
    this.apiBaseUrl = apiBaseUrl;
    this.apiCoreHeaders = { apikey: apiKey };
  }

  async createCharge(options: ChargeOptionsType) {
    const {
      amount,
      expiresIn,
      internalId,
      description,
      callbackUrl,
    } = options;

    const response : ChargeDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.CHARGES_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        expiresIn,
        internalId,
        description,
        callbackUrl,
      },
    });

    return response;
  }

  async getCharge(chargeId: string) {
    const response: ChargeDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.CHARGES_ENDPOINT}/${chargeId}`,
      headers: { ...this.apiCoreHeaders },
    });
      
    return response;
  }

  async decodeCharge(options: DecodeChargeOptionsType) {
    const { invoice } = options;

    const response: DecodeChargeResponseType = await postData({
      url: `${this.apiBaseUrl}${API.DECODE_INVOICE_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: { invoice },
    });

    return response;
  }

  async createWithdrawalRequest(options: WithdrawalRequestOptionsType) {    
    const {
      amount,
      expiresIn,
      internalId,
      callbackUrl,
      description,
    } = options;

    const response : CreateWithdrawalRequestDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.WITHDRAWAL_REQUESTS_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        expiresIn,
        internalId,
        callbackUrl,
        description,
      },
    });

    return response;
  }

  async getWithdrawalRequest(withdrawalRequestId: string) {
    const response : GetWithdrawalRequestDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.WITHDRAWAL_REQUESTS_ENDPOINT}/${withdrawalRequestId}`,
      headers: { ...this.apiCoreHeaders },
    });
      
    return response;
  }

  async validateLightningAddress(lightningAddress: string) {    
    const response : ValidateLightningAddressDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.VALIDATE_LN_ADDRESS_ENDPOINT}/${lightningAddress}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }

  async sendLightningAddressPayment(options: SendLightningAddressPaymentOptionsType) {    
    const {
      amount,
      comment,
      lnAddress,
      internalId,
      callbackUrl,
    } = options;

    const response : SendLightningAddressPaymentDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.SEND_LN_ADDRESS_PAYMENT_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        comment,
        lnAddress,
        internalId,
        callbackUrl,
      },
    });

    return response;
  }

  async createChargeFromLightningAddress(options: CreateChargeFromLightningAddressOptionsType) {    
    const {
      amount,
      lnaddress,
      lnAddress,
      description,
    } = options;


    // Addressing issue on ZBD API where it accepts `lnaddress` property
    // instead of `lnAddress` property as is standardized
    let lightningAddress = lnaddress || lnAddress;

    const response: FetchChargeFromLightningAddressDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.CREATE_CHARGE_FROM_LN_ADDRESS_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        description,
        lnaddress: lightningAddress,
      },
    });

    return response;
  }
  
  async getWallet() {
    const response : WalletDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.WALLET_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
    });
      
    return response;
  }

  async isSupportedRegion(ipAddress: string) {    
    const response : SupportedRegionDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.IS_SUPPORTED_REGION_ENDPOINT}/${ipAddress}`,
      headers: { ...this.apiCoreHeaders },
    });
      
    return response;
  }

  async getZBDProdIps() {    
    const response: ProdIPSDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.FETCH_ZBD_PROD_IPS_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }

  async getBtcUsdExchangeRate() {    
    const response: BTCUSDDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.BTCUSD_PRICE_TICKER_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }

  async internalTransfer(options: InternalTransferOptionsType) {    
    const { amount, receiverWalletId } = options;

    const response: InternalTransferDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.INTERNAL_TRANSFER_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        receiverWalletId,
      },
    });

    return response;
  }

  async sendKeysendPayment(options: KeysendOptionsType) {    
    const {
      amount,
      pubkey,
      metadata,
      tlvRecords,
      callbackUrl,
    } = options;

    const response: KeysendDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.KEYSEND_PAYMENT_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        pubkey,
        metadata,
        tlvRecords,
        callbackUrl,
      },
    });

    return response;
  }

  async sendPayment(options: SendPaymentOptionsType) {    
    const {
      amount,
      invoice,
      internalId,
      description,
      callbackUrl,
    } = options;

    const response : InvoicePaymentDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.PAYMENTS_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        invoice,
        internalId,
        description,
        callbackUrl,
      },
    });

    return response; 
  }

  async getPayment(paymentId: string) {    
    const response = await getData({
      url: `${this.apiBaseUrl}${API.PAYMENTS_ENDPOINT}/${paymentId}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }

  async sendGamertagPayment(options: SendGamertagPaymentOptionsType) {    
    const { amount, gamertag, description } = options;

    const response: SendGamertagPaymentDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.SEND_GAMERTAG_PAYMENT_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        gamertag,
        description,
      },
    });

    return response;
  }

  async getGamertagTransaction(transactionId: string) {    
    const response: GamertagTransactionDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.GET_GAMERTAG_PAYMENT_ENDPOINT}/${transactionId}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }

  async getUserIdByGamertag(gamertag: string) {    
    const response: FetchUserIdByGamertagDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.GET_USERID_FROM_GAMERTAG_ENDPOINT}/${gamertag}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }

  async getGamertagByUserId(userId: string) {    
    const response: FetchGamertagByUserIdDataResponseType = await getData({
      url: `${this.apiBaseUrl}${API.GET_GAMERTAG_FROM_USERID_ENDPOINT}/${userId}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }

   async createGamertagCharge(options: FetchChargeFromGamertagOptionsType) {    
    const {
      amount,
      gamertag,
      internalId,
      description,
      callbackUrl,
    } = options;

    const response : FetchChargeFromGamertagDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.CREATE_CHARGE_FROM_GAMERTAG_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        amount,
        gamertag,
        internalId,
        description,
        callbackUrl,
      },
    });

    return response;
  }

  async createStaticCharge(options: StaticChargeOptionsType) {    
    const {
      minAmount,
      maxAmount,
      internalId,
      description,
      callbackUrl,
      allowedSlots,
      successMessage,
    } = options;

    const response : StaticChargeDataResponseType = await postData({
      url: `${this.apiBaseUrl}${API.STATIC_CHARGES_ENDPOINT}`,
      headers: { ...this.apiCoreHeaders },
      body: {
        minAmount,
        maxAmount,
        internalId,
        callbackUrl,
        description,
        allowedSlots,
        successMessage,
      },
    });

    return response;
  }

  async updateStaticCharge(staticChargeId: string, updates: StaticChargeOptionsType) {    
    const response = await patchData({
      url: `${this.apiBaseUrl}${API.STATIC_CHARGES_ENDPOINT}/${staticChargeId}`,
      headers: { ...this.apiCoreHeaders },
      body: updates,
    });

    return response;
  }

  async getStaticCharge(staticChargeId: string) {    
    const response = await getData({
      url: `${this.apiBaseUrl}${API.STATIC_CHARGES_ENDPOINT}/${staticChargeId}`,
      headers: { ...this.apiCoreHeaders },
    });

    return response;
  }
}

export { zbd };
