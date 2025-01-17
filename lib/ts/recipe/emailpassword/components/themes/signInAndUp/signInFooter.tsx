/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import StyleContext from "../../../../../styles/styleContext";
import { withOverride } from "../../../../../components/componentOverride/withOverride";
import { useTranslation } from "../../../../../translation/translationContext";

export const SignInFooter = withOverride(
    "EmailPasswordSignInFooter",
    function EmailPasswordSignInFooter({ onClick }: { onClick: (() => void) | undefined }): JSX.Element {
        const styles = useContext(StyleContext);
        const t = useTranslation();

        return (
            <div
                data-supertokens="link secondaryText forgotPasswordLink"
                css={[styles.link, styles.secondaryText, styles.forgotPasswordLink]}
                onClick={onClick}>
                {t("EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK")}
            </div>
        );
    }
);
