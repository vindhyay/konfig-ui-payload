import { TestBed } from '@angular/core/testing';

import { ScriptLoaderService } from './script-loader.service';

describe('ScriptLoaderService', () => {
  let service: ScriptLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if a script exists', () => {
    // Simulate the presence of a script in the DOM
    const script = document.createElement('script');
    script.src = 'http://example.com/script.js';
    document.body.appendChild(script);

    // Test the scriptExists function
    expect(service.scriptExists('http://example.com/script.js')).toBe(true);
    expect(service.scriptExists('http://example.com/nonexistent.js')).toBe(false);
  });

  it('should check if a link exists', () => {
    // Simulate the presence of a link in the DOM
    const link = document.createElement('link');
    link.href = 'http://example.com/styles.css';
    document.body.appendChild(link);

    // Test the linkExists function
    expect(service.linkExists('http://example.com/styles.css')).toBe(true);
    expect(service.linkExists('http://example.com/nonexistent.css')).toBe(false);
  });

  it('should load a script if it does not exist', () => {
    const src = 'http://example.com/new-script.js';

    // Mock the document.createElement method
    const createScriptElementSpy = spyOn(document, 'createElement').and.callThrough();

    // Mock the document.head.appendChild method
    const appendChildSpy = spyOn(document.head, 'appendChild').and.callThrough();

    // Test the loadScript function
    service.loadScript(src);

    // Expect that createScriptElement and appendChild methods were called
    expect(createScriptElementSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
  });

  it('should load a CSS link if it does not exist', () => {
    const linkUrl = 'http://example.com/new-styles.css';

    // Mock the document.createElement method
    const createLinkElementSpy = spyOn(document, 'createElement').and.callThrough();

    // Mock the document.head.appendChild method
    const appendChildSpy = spyOn(document.head, 'appendChild').and.callThrough();

    // Test the loadCss function
    service.loadCss(linkUrl);

    // Expect that createLinkElement and appendChild methods were called
    expect(createLinkElementSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
  });
});
