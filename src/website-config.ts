export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  /**
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
}

const config: WebsiteConfig = {
  title: 'Jonathan Eckman',
  description: 'The portfolio and personal blog of Jonathan Eckman',
  coverImage: 'img/blog-cover.jpg',
  logo: 'img/logo.png',
  lang: 'en',
  siteUrl: 'https://jonathaneckman.io',
  twitter: 'https://twitter.com/jonathaneckman4',
  linkedin: 'https://www.linkedin.com/in/jonathaneckman',
  github: 'https://github.com/jonathaneckman',
  showSubscribe: true,
  mailchimpAction: 'https://jonathaneckman.us20.list-manage.com/subscribe/post?u=681503bc3548228e2d86ad0f9&amp;id=83bced18a5',
  mailchimpName: 'b_681503bc3548228e2d86ad0f9_83bced18a5',
};

export default config;
