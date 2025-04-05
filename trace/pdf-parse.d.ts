declare module 'pdf-parse/lib/pdf-parse.js' {
    function parse(dataBuffer: Buffer, options?: any): Promise<{
      text: string;
      numpages: number;
      info: any;
      metadata: any;
      version: string;
    }>;
  
    export = parse;
  }