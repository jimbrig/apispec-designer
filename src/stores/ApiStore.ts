import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { dump, load } from 'js-yaml';
import type { ViewerType } from '../types/viewer';

export type SpecFormat = 'yaml' | 'json';

interface ApiInfo {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: {
    name?: string;
    url?: string;
    email?: string;
  };
  license?: {
    name: string;
    url?: string;
  };
  'x-logo'?: {
    url: string;
    backgroundColor?: string;
    altText?: string;
  };
}

interface ApiSpec {
  openapi: string;
  info: ApiInfo;
  servers?: Array<{
    url: string;
    description?: string;
    variables?: Record<string, {
      enum?: string[];
      default: string;
      description?: string;
    }>;
  }>;
  paths: Record<string, any>;
  components?: {
    schemas?: Record<string, any>;
    securitySchemes?: Record<string, any>;
    parameters?: Record<string, any>;
    responses?: Record<string, any>;
    requestBodies?: Record<string, any>;
    headers?: Record<string, any>;
  };
  security?: Array<Record<string, string[]>>;
  tags?: Array<{
    name: string;
    description?: string;
    externalDocs?: {
      description?: string;
      url: string;
    };
  }>;
}

class ApiStore {
  apiSpec: ApiSpec = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API specification',
    },
    paths: {
      '/hello': {
        get: {
          summary: 'Hello World endpoint',
          description: 'Returns a greeting message',
          operationId: 'getHello',
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Hello, World!'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  selectedViewer: ViewerType = 'redoc';
  specFormat: SpecFormat = 'yaml';

  constructor() {
    makeAutoObservable(this);
  }

  get formattedSpec(): string {
    if (this.specFormat === 'json') {
      return JSON.stringify(this.apiSpec, null, 2);
    }
    return dump(this.apiSpec, { noRefs: true });
  }

  setSpecFormat(format: SpecFormat) {
    this.specFormat = format;
  }

  setViewer(viewer: ViewerType) {
    this.selectedViewer = viewer;
  }

  updateApiSpec(newSpec: ApiSpec) {
    if (this.validateApiSpec(newSpec)) {
      this.apiSpec = newSpec;
      return true;
    }
    return false;
  }

  updateSpecFromString(specString: string) {
    try {
      let newSpec;
      if (this.specFormat === 'json') {
        newSpec = JSON.parse(specString);
      } else {
        newSpec = load(specString);
      }

      if (this.validateApiSpec(newSpec)) {
        this.apiSpec = newSpec;
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  validateApiSpec(spec: any): spec is ApiSpec {
    return (
      spec &&
      typeof spec === 'object' &&
      typeof spec.openapi === 'string' &&
      spec.info &&
      typeof spec.info === 'object' &&
      typeof spec.paths === 'object'
    );
  }
}

export const apiStore = new ApiStore();
const ApiStoreContext = createContext(apiStore);

export const useApiStore = () => useContext(ApiStoreContext);