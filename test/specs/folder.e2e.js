describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        let baseUrl = await browser.getUrl()
        console.log(baseUrl)
        await browser.url(baseUrl+"#/folders");

        await expect($('#pageTitle h3').toBeExisting())
        await expect($('#pageTitle h3').toHaveTextContaining("Used folders"))

        await expect($('#addFolderBtn').toBeExisting())
        await expect($('#addFolderBtn').toHaveTextContaining("Add new folder"))
        await $('#addFolderBtn').click()
        console.log(await $('#formpath'))
        await browser.execute(() => {
            document.querySelectorAll("#formpath")[0].disabled = false
        })
        await $('#formpath').setValue("C:/MyFolder")
        await browser.execute(() => {
            document.querySelectorAll("#formpath")[0].disabled = true
        })
        await $('#formname').setValue("MyFolder")
        await $('#saveFolderBtn').click()

        await browser.debug()
        // await $('#username').setValue('tomsmith');
        // await $('#password').setValue('SuperSecretPassword!');
        // await $('button[type="submit"]').click();

    });
});

