import reducer from '../reducer';

describe('UPLOAD | containers | ModalStepper | reducer', () => {
  describe('ADD_FILES_TO_UPLOAD', () => {
    it('should add the files to the empty filesToUpload array and update the current step', () => {
      const action = {
        type: 'ADD_FILES_TO_UPLOAD',
        filesToUpload: {
          0: { name: 'test1', ok: true },
          1: { name: 'test2', ok: false },
        },
        nextStep: 'test',
      };
      const state = {
        currentStep: 'browse',
        filesToUpload: [],
      };
      const expected = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            abortController: new AbortController(),
            file: { name: 'test2', ok: false },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test2',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 1,
            tempId: null,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });

    it('should add the files to the (not empty) filesToUpload array and update the current step', () => {
      const action = {
        type: 'ADD_FILES_TO_UPLOAD',
        filesToUpload: {
          0: { name: 'test2', test: true },
          1: { name: 'test3', test: false },
        },
        nextStep: 'test',
      };
      const state = {
        currentStep: 'browse',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
        ],
      };
      const expected = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            abortController: new AbortController(),
            file: { name: 'test2', test: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test2',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 1,
            tempId: null,
          },
          {
            abortController: new AbortController(),
            file: { name: 'test3', test: false },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test3',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 2,
            tempId: null,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });

    it('should work if the filesToUpload is empty', () => {
      const action = {
        type: 'ADD_FILES_TO_UPLOAD',
        filesToUpload: {},
        nextStep: 'test',
      };
      const state = {
        currentStep: 'browse',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
        ],
      };
      const expected = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('ADD_URLS_TO_FILES_TO_UPLOAD', () => {
    it('should add the files to the empty filesToUpload array and update the current step', () => {
      const action = {
        type: 'ADD_URLS_TO_FILES_TO_UPLOAD',
        nextStep: 'test',
      };
      const state = {
        currentStep: 'browse',
        filesToUpload: [],
        filesToDownload: ['test', 'test1'],
      };
      const expected = {
        currentStep: 'test',
        filesToDownload: [],
        filesToUpload: [
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test',
            },
            originalIndex: 0,
            fileURL: 'test',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 1,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            originalIndex: 1,
            fileURL: 'test1',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 2,
          },
        ],
      };

      const received = reducer(state, action);

      expect(received.currentStep).toEqual(expected.currentStep);
      expect(received.filesToDownload).toEqual(expected.filesToDownload);
      expect(received.filesToUpload).toEqual(
        expect.arrayContaining([
          expect.objectContaining(expected.filesToUpload[0]),
          expect.objectContaining(expected.filesToUpload[1]),
        ])
      );
    });

    it('should add the files to the (not empty) filesToUpload array and update the current step', () => {
      const state = {
        currentStep: 'browse',
        filesToDownload: ['test2', 'test3'],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            originalIndex: 1,
            fileURL: 'test1',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 2,
          },
        ],
      };
      const action = {
        type: 'ADD_URLS_TO_FILES_TO_UPLOAD',
        nextStep: 'test',
      };

      const expected = {
        currentStep: 'test',
        filesToDownload: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            originalIndex: 1,
            fileURL: 'test1',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 2,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test2',
            },
            originalIndex: 2,
            fileURL: 'test2',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 3,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test3',
            },
            originalIndex: 3,
            fileURL: 'test3',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 4,
          },
        ],
      };

      const received = reducer(state, action);

      expect(received.currentStep).toEqual(expected.currentStep);
      expect(received.filesToDownload).toEqual(expected.filesToDownload);
      expect(received.filesToUpload).toEqual(
        expect.arrayContaining([
          expect.objectContaining(expected.filesToUpload[0]),
          expect.objectContaining(expected.filesToUpload[1]),
          expect.objectContaining(expected.filesToUpload[2]),
          expect.objectContaining(expected.filesToUpload[3]),
        ])
      );
    });
  });

  describe('CLEAN_FILES_ERROR', () => {
    it('should not change the filesToUpload property if it is empty', () => {
      const action = {
        type: 'CLEAN_FILES_ERROR',
      };
      const state = {
        currentStep: 'test',
        filesToUpload: [],
      };

      expect(reducer(state, action)).toEqual(state);
    });

    it('should remove the errors of all files from the filesToUploadArray', () => {
      const action = {
        type: 'CLEAN_FILES_ERROR',
      };
      const state = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true },
            hasError: true,
            errorMessage: 'error2',
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };

      const expected = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('CLEAR_FILES_TO_UPLOAD_AND_DOWNLOAD', () => {
    it('should empty the filesToDownload and filesToUpload arrays', () => {
      const state = {
        filesToDownload: ['1', '2'],
        filesToUpload: ['3', '4'],
      };
      const action = {
        type: 'CLEAR_FILES_TO_UPLOAD_AND_DOWNLOAD',
      };

      const expected = {
        filesToDownload: [],
        filesToUpload: [],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('FILE_DOWLOADED', () => {
    it('should update the corresponding file', () => {
      const state = {
        currentStep: 'browse',
        filesToDownload: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            originalIndex: 1,
            fileURL: 'test1',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 2,
          },
        ],
      };

      const action = {
        type: 'FILE_DOWNLOADED',
        fileTempId: 2,
        blob: 'test',
      };

      const expected = {
        currentStep: 'browse',
        filesToDownload: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            file: 'test',
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            originalIndex: 1,
            fileURL: 'test1',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: false,
            tempId: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('ON_CHANGE', () => {
    it('should change the data correctly', () => {
      const action = {
        type: 'ON_CHANGE',
        keys: 'test',
        value: 'test 1',
      };
      const state = {
        fileToEdit: {
          test: 'test',
          isUploading: true,
        },
        currentStep: 'test',
      };
      const expected = {
        fileToEdit: {
          test: 'test 1',
          isUploading: true,
        },
        currentStep: 'test',
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('ON_CHANGE_URLS_TO_DOWNLOAD', () => {
    it('should change the data correctly', () => {
      const action = {
        type: 'ON_CHANGE_URLS_TO_DOWNLOAD',
        keys: 'test',
        value: ['test 1', 'test 2'],
      };
      const state = {
        filesToDownload: [],
        currentStep: 'test',
      };
      const expected = {
        filesToDownload: ['test 1', 'test 2'],
        currentStep: 'test',
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('SET_FILE_TO_DOWNLOAD_ERROR', () => {
    it('should update the specified file error', () => {
      const state = {
        currentStep: 'browse',
        filesToDownload: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            originalIndex: 1,
            fileURL: 'test1',
            hasError: false,
            errorMessage: null,
            isUploading: false,
            isDownloading: true,
            tempId: 2,
          },
        ],
      };

      const action = {
        type: 'SET_FILE_TO_DOWNLOAD_ERROR',
        fileTempId: 2,
      };

      const expected = {
        currentStep: 'browse',
        filesToDownload: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { name: 'test1', ok: true },
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 0,
            tempId: null,
          },
          {
            file: null,
            fileInfo: {
              alternativeText: '',
              caption: '',
              name: 'test1',
            },
            originalIndex: 1,
            fileURL: 'test1',
            hasError: true,
            errorMessage: 'test1',
            isUploading: false,
            isDownloading: false,
            tempId: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('TOGGLE_SELECT_ALL', () => {
    it('should select all files', () => {
      const action = {
        type: 'TOGGLE_SELECT_ALL',
      };
      const state = {
        selectedFiles: [],
        files: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const expected = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      expect(reducer(state, action)).toEqual(expected);
    });
    it('should deselect all files', () => {
      const action = {
        type: 'TOGGLE_SELECT_ALL',
      };
      const state = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const expected = {
        selectedFiles: [],
        files: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      expect(reducer(state, action)).toEqual(expected);
    });
    it('should add the unselect files of the current page', () => {
      const action = {
        type: 'TOGGLE_SELECT_ALL',
      };
      const state = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const expected = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      expect(reducer(state, action)).toEqual(expected);
    });
    it('should add all files to the already selected files if not in the same page', () => {
      const action = {
        type: 'TOGGLE_SELECT_ALL',
      };
      const state = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 3,
            name: 'myThirdFile',
            ext: '.png',
            mime: 'image/png',
            size: 4.22,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 4,
            name: 'myFourthFile',
            ext: '.png',
            mime: 'image/png',
            size: 3.44,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const expected = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 3,
            name: 'myThirdFile',
            ext: '.png',
            mime: 'image/png',
            size: 4.22,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 4,
            name: 'myFourthFile',
            ext: '.png',
            mime: 'image/png',
            size: 3.44,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 3,
            name: 'myThirdFile',
            ext: '.png',
            mime: 'image/png',
            size: 4.22,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 4,
            name: 'myFourthFile',
            ext: '.png',
            mime: 'image/png',
            size: 3.44,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      expect(reducer(state, action)).toEqual(expected);
    });
    it('should deselect all files of the current page only', () => {
      const action = {
        type: 'TOGGLE_SELECT_ALL',
      };
      const state = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 3,
            name: 'myThirdFile',
            ext: '.png',
            mime: 'image/png',
            size: 4.22,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 4,
            name: 'myFourthFile',
            ext: '.png',
            mime: 'image/png',
            size: 3.44,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 3,
            name: 'myThirdFile',
            ext: '.png',
            mime: 'image/png',
            size: 4.22,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 4,
            name: 'myFourthFile',
            ext: '.png',
            mime: 'image/png',
            size: 3.44,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const expected = {
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'mySecondFile',
            ext: '.png',
            mime: 'image/png',
            size: 2.24,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        files: [
          {
            id: 3,
            name: 'myThirdFile',
            ext: '.png',
            mime: 'image/png',
            size: 4.22,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 4,
            name: 'myFourthFile',
            ext: '.png',
            mime: 'image/png',
            size: 3.44,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('GO_TO', () => {
    it('should update the current step', () => {
      const action = {
        type: 'GO_TO',
        to: 'test',
      };
      const state = {
        currentStep: 'browse',
      };
      const expected = {
        currentStep: 'test',
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('REMOVE_FILE_TO_UPLOAD', () => {
    it('should remove the file from the filesToUpload array', () => {
      const action = {
        type: 'REMOVE_FILE_TO_UPLOAD',
        fileIndex: 1,
      };
      const state = {
        currentStep: 'test',
        selectedFiles: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true },
            hasError: true,
            errorMessage: 'error2',
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };
      const expected = {
        currentStep: 'test',
        selectedFiles: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },

          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
    it('should remove the file and add it to the selectedFiles', () => {
      const action = {
        type: 'REMOVE_FILE_TO_UPLOAD',
        fileIndex: 1,
        addToSelectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const state = {
        currentStep: 'test',
        currentTab: 'browse',
        selectedFiles: [],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true, name: 'My File' },
            hasError: true,
            errorMessage: 'error2',
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };
      const expected = {
        currentStep: 'test',
        currentTab: 'selected',
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
    it('should remove the file and not add to the selectedFiles if the input is not multiple', () => {
      const action = {
        type: 'REMOVE_FILE_TO_UPLOAD',
        fileIndex: 1,
        addToSelectedFiles: [
          {
            id: 2,
            name: 'myFile2',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const state = {
        currentStep: 'test',
        currentTab: 'browse',
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true, name: 'My File' },
            hasError: true,
            errorMessage: 'error2',
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };
      const expected = {
        currentStep: 'test',
        currentTab: 'selected',
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
    it('should remove the file and add to the selectedFiles if the input is multiple', () => {
      const action = {
        type: 'REMOVE_FILE_TO_UPLOAD',
        fileIndex: 1,
        multiple: true,
        addToSelectedFiles: [
          {
            id: 2,
            name: 'myFile2',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
      };
      const state = {
        currentStep: 'test',
        currentTab: 'browse',
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true, name: 'My File' },
            hasError: true,
            errorMessage: 'error2',
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };
      const expected = {
        currentStep: 'test',
        currentTab: 'selected',
        selectedFiles: [
          {
            id: 1,
            name: 'myFile',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
          {
            id: 2,
            name: 'myFile2',
            ext: '.png',
            mime: 'image/png',
            size: 146.25,
            url: '/uploads/ba0c3352c4b14132aed3fcf3110b481c.png',
            created_at: '2020-03-04T09:45:32.444Z',
            updated_at: '2020-03-04T09:45:32.444Z',
          },
        ],
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: true,
            errorMessage: 'error1',
            isUploading: false,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: true,
            errorMessage: 'error3',
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('RESET_PROPS', () => {
    it('should return the initialState', () => {
      const action = { type: 'RESET_PROPS' };
      const state = { test: true };
      const expected = {
        selectedFiles: [],
        files: [],
        filesToDownload: [],
        filesToUpload: [],
        fileToEdit: null,
        currentTab: null,
        params: {
          _limit: 10,
          _start: 0,
          _q: '',
          filters: [],
          _sort: null,
        },
        currentStep: 'list',
        isFormDisabled: false,
        isWarningDeleteOpen: false,
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('SET_CROP_RESULT', () => {
    it('should update the fileToEditEntry with the passed data', () => {
      const action = {
        type: 'SET_CROP_RESULT',
        blob: {
          test: true,
        },
      };
      const state = {
        fileToEdit: {
          originalIndex: 1,
          file: null,
        },
      };
      const expected = {
        fileToEdit: {
          originalIndex: 1,
          file: {
            test: true,
          },
        },
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('SET_FILE_ERROR', () => {
    it('should update the specified file error', () => {
      const action = {
        type: 'SET_FILE_ERROR',
        fileIndex: 1,
        errorMessage: 'size limit exceeded',
      };
      const state = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 2,
          },
        ],
      };

      const expected = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true },
            hasError: true,
            errorMessage: 'size limit exceeded',
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('SET_FILE_TO_EDIT_ERROR', () => {
    it('should update the fileToEdit error', () => {
      const action = {
        type: 'SET_FILE_TO_EDIT_ERROR',
        errorMessage: 'size limit exceeded',
      };
      const state = {
        fileToEdit: {
          originalIndex: 1,
          file: {
            name: 'test1',
          },
          hasError: false,
          errorMessage: null,
          isUploading: true,
        },
        filesToUpload: [
          {
            originalIndex: 0,
            file: {
              name: 'test0',
            },
          },
          {
            originalIndex: 1,
            file: {
              name: 'test1',
            },
          },
          {
            originalIndex: 2,
            file: {
              name: 'test2',
            },
          },
        ],
      };
      const expected = {
        fileToEdit: {
          originalIndex: 1,
          file: {
            name: 'test1',
          },
          hasError: true,
          errorMessage: 'size limit exceeded',
          isUploading: false,
        },
        filesToUpload: [
          {
            originalIndex: 0,
            file: {
              name: 'test0',
            },
          },
          {
            originalIndex: 1,
            file: {
              name: 'test1',
            },
          },
          {
            originalIndex: 2,
            file: {
              name: 'test2',
            },
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('SET_NEW_FILE_TO_EDIT', () => {
    it('should set the fileToEdit key with the file at the passed index from the filesToUpload list', () => {
      const action = {
        type: 'SET_NEW_FILE_TO_EDIT',
        fileIndex: 1,
      };
      const state = {
        fileToEdit: null,
        filesToUpload: [
          {
            originalIndex: 0,
            file: {
              name: 'test0',
            },
          },
          {
            originalIndex: 1,
            file: {
              name: 'test1',
            },
          },
          {
            originalIndex: 2,
            file: {
              name: 'test2',
            },
          },
        ],
      };
      const expected = {
        fileToEdit: {
          originalIndex: 1,
          file: {
            name: 'test1',
          },
        },
        filesToUpload: [
          {
            originalIndex: 0,
            file: {
              name: 'test0',
            },
          },
          {
            originalIndex: 1,
            file: {
              name: 'test1',
            },
          },
          {
            originalIndex: 2,
            file: {
              name: 'test2',
            },
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('SET_FILES_UPLOADING_STATE', () => {
    it('should change all the isUploading keys of the filesToUpload to true', () => {
      const action = {
        type: 'SET_FILES_UPLOADING_STATE',
      };
      const state = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: false,
            errorMessage: 'test',
            isUploading: true,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: false,
            errorMessage: null,
            isUploading: false,
            originalIndex: 2,
          },
        ],
      };
      const expected = {
        currentStep: 'test',
        filesToUpload: [
          {
            abortController: new AbortController(),
            file: { ok: true },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 0,
          },
          {
            abortController: new AbortController(),
            file: { test: true },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 1,
          },
          {
            abortController: new AbortController(),
            file: { test: false },
            hasError: false,
            errorMessage: null,
            isUploading: true,
            originalIndex: 2,
          },
        ],
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });

  describe('SET_FILE_TO_EDIT', () => {
    it('should add a file to edit', () => {
      const action = {
        type: 'SET_FILE_TO_EDIT',
        fileId: 13252341,
      };
      const state = {
        currentStep: 'test',
        fileToEdit: null,
        files: [
          {
            id: 13252341,
            alternativeText: 'My first picture',
            caption: null,
            name: 'picture1',
            updated_at: '2020-03-30T10:48:26+02:00',
            created_at: '2020-03-30T10:48:26+02:00',
          },
          { id: 5564723, alternativeText: 'My second picture', caption: '', name: '' },
        ],
      };
      const expected = {
        currentStep: 'test',
        files: [
          {
            id: 13252341,
            alternativeText: 'My first picture',
            caption: null,
            name: 'picture1',
            updated_at: '2020-03-30T10:48:26+02:00',
            created_at: '2020-03-30T10:48:26+02:00',
          },
          { id: 5564723, alternativeText: 'My second picture', caption: '', name: '' },
        ],
        fileToEdit: {
          id: 13252341,
          abortController: new AbortController(),
          file: {
            name: 'picture1',
            created_at: '2020-03-30T10:48:26+02:00',
          },
          fileInfo: {
            alternativeText: 'My first picture',
            caption: null,
            name: 'picture1',
          },
          hasError: false,
          errorMessage: null,
          isUploading: false,
        },
      };

      expect(reducer(state, action)).toEqual(expected);
    });
  });
});
