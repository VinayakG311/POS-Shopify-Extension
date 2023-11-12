import {
  AlphaCard,
  Page,
  Layout,
  Checkbox,
  Text,
  Button,
  TextField,
  Frame,
  Modal,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";

export default function CreateWallet() {
  const { t } = useTranslation();

  const [storeEmail, setStoreEmail] = useState("");
  const [storeName, setStoreName] = useState("");
  const [walletName, setWalletName] = useState("");
  const [walletPassword, setWalletPassword] = useState("");

  // error state
  const [storeEmailError, setStoreEmailError] = useState(false);
  const [storeNameError, setStoreNameError] = useState(false);
  const [walletNameError, setWalletNameError] = useState(false);
  const [walletPasswordError, setWalletPasswordError] = useState(false);

  const [storeEmailDisabled, setStoreEmailDisabled] = useState(false);
  const [storeNameDisabled, setStoreNameDisabled] = useState(false);
  const [walletNameDisabled, setWalletNameDisabled] = useState(false);
  const [walletPasswordDisabled, setWalletPasswordDisabled] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const [checked, setChecked] = useState(false);

  // change disabled on validation

  useEffect(() => {
    if (
      storeNameDisabled ||
      storeEmailDisabled ||
      walletNameDisabled ||
      walletPasswordDisabled ||
      !checked
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    storeNameDisabled,
    storeEmailDisabled,
    walletNameDisabled,
    walletPasswordDisabled,
  ]);

  // handle changes

  const handleCheck = useCallback((newChecked) => setChecked(newChecked), []);

  const handleStoreEmailChange = useCallback(
    (value) => setStoreEmail(value),
    []
  );

  const handleStoreNameChange = useCallback((value) => setStoreName(value), []);

  const handleWalletNameChange = useCallback(
    (value) => setWalletName(value),
    []
  );

  const handleWalletPasswordChange = useCallback(
    (value) => setWalletPassword(value),
    []
  );

  // validation

  const validateStoreName = () => {
    if (storeName == "") {
      setStoreNameError("Store name must not be empty");
      setStoreNameDisabled(true);
    } else {
      setStoreNameError(false);
      setStoreNameDisabled(false);
    }
  };

  const validateStoreEmail = () => {
    if (storeName == "") {
      setStoreEmailError("Store email must not be empty");
      setStoreEmailDisabled(true);
    } else if (
      !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(storeEmail)
    ) {
      setStoreEmailError("Store email is invalid");
      setStoreEmailDisabled(true);
    } else {
      setStoreEmailError(false);
      setStoreEmailDisabled(false);
    }
  };

  const validateWalletName = () => {
    if (walletName == "") {
      setWalletNameError("Wallet name must not be empty");
      setWalletNameDisabled(true);
    } else {
      setWalletNameError(false);
      setWalletNameDisabled(false);
    }
  };

  const validateWalletPassword = () => {
    if (walletPassword == "") {
      setWalletPasswordError("Wallet password must not be empty");
      setWalletPasswordDisabled(true);
    } else if (walletPassword.length < 8) {
      setWalletPasswordError("Wallet password must have at least 8 characters");
      setWalletPasswordDisabled(true);
    } else if (!/[a-z]+[A-Z]+[0-9]+[^a-zA-Z0-9]+/.test(walletPassword)) {
      setWalletPasswordError(
        "Wallet password must have lowercase, uppercase, numeric and special characters"
      );
      setWalletPasswordDisabled(true);
    } else {
      setWalletPasswordError(false);
      setWalletPasswordDisabled(false);
    }
  };

  return (
    <Page>
      <TitleBar
        title={t("CreateWallet.title")}
        secondaryActions={[
          {
            content: "Back",
            onAction: null,
          },
        ]}
      />
      <Layout>
        <Layout.AnnotatedSection
          title={t("CreateWallet.Section1Header")}
          description={t("CreateWallet.Section1Desc")}
        >
          <AlphaCard>
            <TextField
              label={t("CreateWallet.Input1Label")}
              placeholder={t("CreateWallet.Input1Placeholder")}
              autoComplete="none"
              value={storeName}
              onChange={handleStoreNameChange}
              error={storeNameError}
              onBlur={validateStoreName}
            />
            <div style={{ marginTop: "16px" }}>
              <TextField
                type="email"
                label={t("CreateWallet.Input2Label")}
                placeholder={t("CreateWallet.Input2Placeholder")}
                autoComplete="email"
                helpText="We’ll use this address if we need to contact you about your account."
                value={storeEmail}
                onChange={handleStoreEmailChange}
                error={storeEmailError}
                onBlur={validateStoreEmail}
              />
            </div>
          </AlphaCard>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title="Wallet details"
          description="Greenstand needs this information to save your wallet"
        >
          <AlphaCard>
            <TextField
              label={t("CreateWallet.Input3Label")}
              placeholder={t("CreateWallet.Input3Placeholder")}
              autoComplete="none"
              value={walletName}
              onChange={handleWalletNameChange}
              error={walletNameError}
              onBlur={validateWalletName}
            />
          </AlphaCard>
        </Layout.AnnotatedSection>
        <div style={{ marginTop: "32px", width: "100%" }}>
          <Checkbox
            label={t("CreateWallet.TermsAndConditions")}
            checked={checked}
            onChange={handleCheck}
          />
          <div style={{ marginTop: "32px", width: "100%" }}>
            <Button primary fullWidth size="large" disabled={disabled}>
              {t("CreateWallet.ButtonText")}
            </Button>
          </div>
        </div>
      </Layout>
    </Page>
  );
}
