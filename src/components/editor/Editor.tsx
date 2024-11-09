"use client";
import { useState, useEffect } from 'react';
import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { Button } from '@/components/ui/button';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ShareModal from '@/components/shareModal';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}
type User = {
  id: string;
  aud: string;
  email?: string;
  // Add other properties as needed based on Supabase's user object structure
};
export function Editor() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('title');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Specify User | null
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = await createClient();
      const { data: userData } = await supabase.auth.getUser();

      // Set user state if authenticated
      if (userData?.user?.aud === 'authenticated') {
        setUser(userData.user);
      }
    };

    checkAuth();
  }, [router]);

  const handleShareClick = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      router.push('/sign-in');
    }
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const toggleEditMode = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  const initialConfig = {
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: any) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
  };

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container size-full">
          <div className="h-16 bg-slate-800 flex justify-between items-center px-8 rounded-t-xl">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={toggleEditMode}
                className="bg-slate-800 text-white text-2xl border-b-2 border-slate-500 outline-none"
                autoFocus
              />
            ) : (
              <h2 className="text-white text-2xl flex items-center">
                {title}
                <div onClick={toggleEditMode} className="w-5 h-5 ml-2 mb-3 cursor-pointer text-gray-400 hover:text-white">
                  ✎
                </div>
              </h2>
            )}
            <Button onClick={handleShareClick}>Share</Button>
          </div>
          <ToolbarPlugin />
          <div className="editor-inner h-[1100px]">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input h-full" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
      <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
