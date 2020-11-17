/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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

/*
 * Imports.
 */
import { ST_ROOT_SELECTOR } from "./constants";
import assert from "assert";

/*
 * General Helpers.
 */

export function mockWindowLocation(url) {
    try {
        const location = new URL(url);
        global.window = Object.create(window);
        Object.defineProperty(window, "location", {
            value: location
        });
    } catch (e) {
        throw Error(`Failed to mock window location object with ${url}`, e);
    }
}


/*
 * Selectors and actions helpers.
 * Using Puppeteer within shadowDom https://github.com/puppeteer/puppeteer/issues/858#issuecomment-438540596
 */

export async function getSubmitFormButtonLabel(page) {
   return  await page.evaluate(
       (ST_ROOT_SELECTOR) => document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("form > div > button").innerText,
       ST_ROOT_SELECTOR
    )
}

export async function getSubmitFormButton(page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("form > div > button")`);
}

export async function submitForm(page) {
    const submitButton = await getSubmitFormButton(page);
    await submitButton.click();
}

export async function getLogoutButton(page) {
    return await page.evaluateHandle("document.querySelector('button.logout')");
}


export async function getSignInOrSignUpSwitchLink(page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("div > div > div.headerSubtitle > div > span.link")`);
}

export async function getForgotPasswordLink(page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("form > div > .forgotPasswordLink")`);
}

export async function getResendResetPasswordEmailLink (page) {
    return await page.evaluateHandle(`document.querySelector("${ST_ROOT_SELECTOR}").shadowRoot.querySelector("div > div > div.successMessage > span")`);
}

export async function sendEmailResetPasswordSuccessMessage (page) {
    return await page.evaluate(
        () =>
            document
                .querySelector("#supertokens-root")
                .shadowRoot.querySelector("div > div > div.successMessage").innerText
    );
}

export async function assertNoSTComponents (page) {
    const superTokensComponent = await page.$(ST_ROOT_SELECTOR);
    assert.strictEqual(superTokensComponent, null);
}

export async function getInputNames(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll('.formRow .input'),
            i => i.name
        )
    , {ST_ROOT_SELECTOR})
}

export async function getLabelsText(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll('.formRow .label'),
            i => i.innerText
        )
    , {ST_ROOT_SELECTOR})
}

export async function getPlaceholders(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll('.formRow .input'),
            i => i.placeholder
        )
    , {ST_ROOT_SELECTOR})
}


export async function getFieldErrors(page) {
    return await page.evaluate(({ST_ROOT_SELECTOR}) => 
        Array.from(
            document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelectorAll('.formRow .inputErrorMessage'),
            i => i.innerText
        )
    , {ST_ROOT_SELECTOR})
}

export async function getGeneralError(page) {
    return  await page.evaluate(
        (ST_ROOT_SELECTOR) => document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector("div > div > div.generalError").innerText,
        ST_ROOT_SELECTOR
     )
 }

 export async function setInputValue(page, name, value) {
    return await page.evaluate(({name, value, ST_ROOT_SELECTOR}) => {
        const inputNode = document.querySelector(ST_ROOT_SELECTOR).shadowRoot.querySelector(`input[name=${name}]`);
        inputNode.focus();
        inputNode.value = value;
    }, {name,value, ST_ROOT_SELECTOR});
}

export async function clearBrowserCookies (page) {
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');
}

export async function clickForgotPasswordLink (page) {
        // Click on Forgot Password Link.
        const forgotPasswordLink = await getForgotPasswordLink(page);
        await forgotPasswordLink.click();
        await page.waitForNavigation({ waitUntil: "networkidle0" });
}

export async function toggleSignInSignUp(page) {
    // Click on Sign Up.
    const signUpLink = await getSignInOrSignUpSwitchLink(page);
    await signUpLink.click();
}