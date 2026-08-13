import * as allure from "allure-playwright";

export class AllureReport {
  /**
   * Add a step with attachment (screenshot, log, etc.) to the current test
   */
  static async step<T>(name: string, body: () => Promise<T>): Promise<T> {
    return await allure.step(name, body);
  }

  /**
   * Attach a file/screenshot to the Allure report
   */
  static async attach(
    name: string,
    buffer: Buffer | string,
    options: { contentType: string }
  ): Promise<void> {
    await allure.attachment(name, buffer, options);
  }

  /**
   * Attach a JSON object as a file
   */
  static async attachJson(name: string, data: object): Promise<void> {
    await allure.attachment(
      name,
      Buffer.from(JSON.stringify(data, null, 2)),
      { contentType: "application/json" }
    );
  }

  /**
   * Attach plain text (e.g., logs) to the report
   */
  static async attachText(name: string, text: string): Promise<void> {
    await allure.attachment(name, Buffer.from(text), {
      contentType: "text/plain",
    });
  }

  /**
   * Attach an image buffer to the report
   */
  static async attachImage(name: string, buffer: Buffer): Promise<void> {
    await allure.attachment(name, buffer, { contentType: "image/png" });
  }

  /**
   * Add a label to the current test (e.g., feature, story)
   */
  static addLabel(name: string, value: string): void {
    allure.label(name, value);
  }

  /**
   * Add severity label to the test
   */
  static addSeverity(severity: allure.Severity): void {
    allure.severity(severity);
  }

  /**
   * Add description (HTML supported) to the current test
   */
  static addDescription(description: string, descriptionType: allure.DescriptionType = "text"): void {
    allure.description(description, descriptionType);
  }

  /**
   * Add a link (e.g., issue, TMS) to the current test
   */
  static addLink(url: string, name?: string, type?: string): void {
    allure.link(url, name, type);
  }

  /**
   * Add an issue link
   */
  static addIssue(url: string, name?: string): void {
    allure.issue(url, name);
  }

  /**
   * Add a TMS (Test Management System) link
   */
  static addTms(url: string, name?: string): void {
    allure.tms(url, name);
  }

  /**
   * Add an epic label
   */
  static addEpic(epic: string): void {
    allure.epic(epic);
  }

  /**
   * Add a feature label
   */
  static addFeature(feature: string): void {
    allure.feature(feature);
  }

  /**
   * Add a story label
   */
  static addStory(story: string): void {
    allure.story(story);
  }

  /**
   * Add a tag to the test
   */
  static addTag(tag: string): void {
    allure.tag(tag);
  }

  /**
   * Add owner to the test
   */
  static addOwner(owner: string): void {
    allure.owner(owner);
  }

  /**
   * Add a parameter to the test report
   */
  static addParameter(name: string, value: string): void {
    allure.parameter(name, value);
  }
}
