/**
 * DataGenerator — Faker-backed fake data for the TTACart project.
 *
 * TTACart is a SauceDemo-style storefront: it needs login credentials and
 * checkout customer info (first name, last name, postal code). This util
 * centralises all random data so tests stay deterministic-friendly (one
 * import) and read naturally.
 *
 * Faker v8 API notes (project is CommonJS, so we pin the dual CJS/ESM v8):
 *   - `faker.internet.userName()`        (lowercase `username()` is v9+ only)
 *   - `faker.internet.password({length})` (v8 options-object form; avoids the
 *      deprecated positional overload)
 *   - `faker.location.zipCode()`         (v8 renamed `address` -> `location`)
 */

import { faker } from '@faker-js/faker';

export interface Credentials {
    username: string;
    password: string;
}

export interface CheckoutCustomer {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export interface UserProfile extends Credentials, CheckoutCustomer {
    email: string;
    fullName: string;
    phone: string;
}

export class DataGenerator {
    // ---------- credentials ----------

    /** Random username, e.g. "Otilia35". */
    static username(): string {
        return faker.internet.username();
    }

    /**
     * Random password. Defaults to a 12-char password.
     * Pass length to tune for negative-test cases.
     */
    static password(length = 12): string {
        return faker.internet.password({ length });
    }

    /** Username + password pair. */
    static credentials(): Credentials {
        return {
            username: DataGenerator.username(),
            password: DataGenerator.password(),
        };
    }

    // ---------- contact ----------

    static firstName(): string {
        return faker.person.firstName();
    }

    static lastName(): string {
        return faker.person.lastName();
    }

    static email(): string {
        return faker.internet.email();
    }

    static phone(): string {
        return faker.phone.number();
    }

    static postalCode(): string {
        return faker.location.zipCode();
    }

    // ---------- generic helpers ----------

    /** Integer between min and max (inclusive). */
    static number(min = 0, max = 100): number {
        return faker.number.int({ min, max });
    }

    /** Random boolean. */
    static bool(): boolean {
        return faker.datatype.boolean();
    }

    /** Pick a random element from an array. */
    static oneOf<T>(arr: readonly T[]): T {
        return faker.helpers.arrayElement(arr);
    }

    /**
     * Date offset from a base date.
     * @param days number of days to add (can be negative)
     * @param base optional base date; defaults to today
     * @returns ISO date string (YYYY-MM-DD)
     */
    static dateOffset(days: number, base: Date | string = new Date()): string {
        const d = new Date(base);
        d.setDate(d.getDate() + days);
        return d.toISOString().split('T')[0];
    }

    // ---------- composites ----------

    /** Customer info for the TTACart checkout step-one form. */
    static checkoutCustomer(): CheckoutCustomer {
        return {
            firstName: DataGenerator.firstName(),
            lastName: DataGenerator.lastName(),
            postalCode: DataGenerator.postalCode(),
        };
    }

    /** Full profile — creds + checkout fields + contact. */
    static userProfile(): UserProfile {
        const firstName = DataGenerator.firstName();
        const lastName = DataGenerator.lastName();
        return {
            username: DataGenerator.username(),
            password: DataGenerator.password(),
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            phone: DataGenerator.phone(),
            postalCode: DataGenerator.postalCode(),
        };
    }
}

export default DataGenerator;