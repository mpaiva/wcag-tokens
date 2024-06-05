	// URLs for fetching WCAG data
  const wcagSearchUrl = "https://raw.githubusercontent.com/mpaiva/wcag-tokens/main/wcag-search-src.json";
  const wcagTokensUrl = "https://raw.githubusercontent.com/mpaiva/wcag-tokens/main/wcag-tokens.json";

  document.addEventListener("alpine:init", () => {
    Alpine.data('wcagPlugin', () => ({
      // State variables
      activeTab: 'Search Guidelines',
      isOnline: navigator.onLine,
      connectionButtonText: 'Try Again',
      isLoading: false,
      query: '',
      results: [],
      searchResultText: '',
      resultsImport: '',
      importButtonText: 'Import tokens as variables',

      // Initialization function
      init() {
        this.fetchGuidelinesData();
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
      },

      // Fetch guidelines data
      fetchGuidelinesData() {
        fetch(wcagSearchUrl)
          .then(response => response.json())
          .then(data => this.jsonData = data);
      },

      // Update online status
      updateOnlineStatus() {
        this.isOnline = navigator.onLine;
      },

      // Check internet connection
      checkConnection() {
        this.connectionButtonText = 'Trying...';
        setTimeout(() => {
          this.updateOnlineStatus();
          this.connectionButtonText = 'Try Again';
        }, 2000);
      },

      // Search guidelines functionality
      async searchGuidelines() {
        this.isLoading = true;
        this.results = this.findInJson(this.jsonData, this.query);
        this.searchResultText = `${this.results.length} guidelines found.`;
        this.isLoading = false;
      },

      // Find guidelines in JSON data
      findInJson(items, query) {
        let results = [];
        const lowerCaseQuery = query.toLowerCase();
        const isExactPhrase = lowerCaseQuery.startsWith('"') && lowerCaseQuery.endsWith('"');
        const searchTerm = isExactPhrase ? lowerCaseQuery.slice(1, -1) : lowerCaseQuery;

        items.forEach(item => {
          const refIdMatch = item.ref_id && item.ref_id.toLowerCase().includes(searchTerm);
          const titleMatch = item.title && item.title.toLowerCase().includes(searchTerm);
          const descriptionMatch = item.description && item.description.toLowerCase().includes(searchTerm);
          const urlMatch = item.url && item.url.toLowerCase().includes(searchTerm);
          const levelMatch = item.level && item.level.toLowerCase().includes(searchTerm);
          const versionMatch = item.version && item.version.toLowerCase().includes(searchTerm);

          if (refIdMatch || titleMatch || descriptionMatch || urlMatch || levelMatch || versionMatch) {
            results.push(item);
          }

          if (item.guidelines) {
            results = results.concat(this.findInJson(item.guidelines, query));
          }

          if (item.success_criteria) {
            results = results.concat(this.findInJson(item.success_criteria, query));
          }

          if (item.special_cases) {
            item.special_cases.forEach(specialCase => {
              const specialCaseTitleMatch = specialCase.title && specialCase.title.toLowerCase().includes(searchTerm);
              const specialCaseDescriptionMatch = specialCase.description && specialCase.description.toLowerCase().includes(searchTerm);

              if (specialCaseTitleMatch || specialCaseDescriptionMatch) {
                if (!results.includes(item)) {
                  results.push(item);
                }
              }
            });
          }

          if (item.notes) {
            item.notes.forEach(note => {
              const noteMatch = note.content && note.content.toLowerCase().includes(searchTerm);

              if (noteMatch) {
                if (!results.includes(item)) {
                  results.push(item);
                }
              }
            });
          }

          if (item.references) {
            item.references.forEach(reference => {
              const referenceTitleMatch = reference.title && reference.title.toLowerCase().includes(searchTerm);
              const referenceUrlMatch = reference.url && reference.url.toLowerCase().includes(searchTerm);

              if (referenceTitleMatch || referenceUrlMatch) {
                if (!results.includes(item)) {
                  results.push(item);
                }
              }
            });
          }
        });

        return results;
      },

      // Add a WCAG card
      addCard(item) {
        const cloneableItem = this.prepareCloneableItem(item);
        parent.postMessage({ pluginMessage: { type: 'create-wcag-card', item: cloneableItem } }, '*');
      },

      // Prepare a cloneable WCAG item
      prepareCloneableItem(item) {
        return {
          ref_id: item.ref_id,
          title: item.title,
          description: item.description,
          url: item.url,
          level: item.level,
          version: item.version,
          special_cases: item.special_cases ? item.special_cases.map(sc => ({ title: sc.title, description: sc.description })) : [],
          notes: item.notes ? item.notes.map(note => ({ content: note.content })) : [],
          references: item.references ? item.references.map(ref => ({ url: ref.url, title: ref.title })) : []
        };
      },

      // Import WCAG tokens
      importWCAGTokens() {
        this.resultsImport = '';
        this.importButtonText = 'Loading tokens...';
        fetch(wcagTokensUrl)
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch WCAG tokens');
            return response.json();
          })
          .then(json => {
            parent.postMessage({
              pluginMessage: {
                type: 'import-files',
                files: [{ name: 'wcag-tokens.json', content: JSON.stringify(json) }]
              }
            }, '*');
            this.resultsImport = '<p class="p-2 mt-2 border-emerald-600/20 border bg-emerald-600/20 rounded">🎉 Successfully imported tokens.</p>';
            setTimeout(() => {
              this.resultsImport = '';
            }, 5000);
          })
          .catch(error => {
            console.error('Failed to load WCAG tokens:', error);
            this.resultsImport = `<p class="p-2 mt-2 border-red-600/20 border bg-red-600/20 rounded">🤔 Error while importing tokens.</p>`;
            setTimeout(() => {
              this.resultsImport = '';
            }, 5000);
          })
          .finally(() => {
            this.importButtonText = 'Import tokens as variables';
          });
      }
    }));
  });
 