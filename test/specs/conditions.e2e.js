describe('Condition Page', () => {
    it('should add condition and filter properly', async () => {
        let baseUrl = await browser.getUrl()
        console.log(baseUrl)
        await browser.url(baseUrl+"#/conditions");
        await expect($('#addConditionBtn').toBeExisting())
        await expect($('#addConditionBtn').toHaveTextContaining("Add new condition"))
        await browser.saveScreenshot("./test/specs/conditionStart.png")
        await $('#addConditionBtn').click()
        await $('#editConditionBtn').click()
        await browser.saveScreenshot("./test/specs/conditionOpened.png")
        await $('#formname').clearValue()
        await $('#formname').setValue("My condition")
        await $('#formdescription').clearValue()
        await $('#formdescription').setValue("My condition description")
        await $('#formassosiation').selectByAttribute("value", "AND");
        await $('#addNewBtn').click()
        await $('#addSubFilterBtn').click()
        await browser.saveScreenshot("./test/specs/conditionFilled.png")
        await $('#subConditionsTable #editSubConditionBtn').click()
        await browser.saveScreenshot("./test/specs/filterOpened.png")
        await $('#form_name').clearValue()
        await $('#form_name').setValue("MP3 Filter")
        await $('#form_description').clearValue()
        await $('#form_description').setValue("MP3 format filter")
        await $('#form_field').selectByAttribute("value", "fileExtension");
        await $('#form_comparator').selectByAttribute("value", "do_contains");
        await $('#form_valueText').clearValue()
        await $('#form_valueText').setValue("mp3")
        await browser.saveScreenshot("./test/specs/filterFilled.png")
        await $('#saveFilterBtn').click()
        await browser.saveScreenshot("./test/specs/filterChanged.png")
        // setTimeout(() => {
        // },1000)
        await $('#saveConditionBtn').click()
        await $('#conditionsPageModal').waitForExist({reverse: true})
        await browser.saveScreenshot("./test/specs/conditionChanged.png")
        await browser.debug()
    });
});

