# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/bin

export PATH

if [ -z "$PERL5LIB" ]
then
        # If PERL5LIB wasn't previously defined, set it...
        PERL5LIB=~/data/perl/share/perl5
else
        # ...otherwise, extend it.
        PERL5LIB=$PERL5LIB:~/data/perl/share/perl5
fi

export PERLLIB

MANPATH=$MANPATH:~/data/perl/share/man

export PERL5LIB MANPATH
